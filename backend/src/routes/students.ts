import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { UserRole } from '@prisma/client';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /students - teacher: list all students with enrollments; student: 403
router.get('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: { role: UserRole.STUDENT },
    include: {
      studentProfile: {
        include: {
          enrollments: {
            where: { status: 'ACTIVE' },
            include: { course: { select: { id: true, title: true, level: true } } },
          },
        },
      },
    },
  });
  const students = users
    .filter((u) => u.studentProfile)
    .map((u) => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      name: `${u.firstName} ${u.lastName}`,
      level: u.studentProfile!.level,
      phone: u.studentProfile!.phone,
      notes: u.studentProfile!.notes,
      createdAt: u.createdAt,
      enrollments: u.studentProfile!.enrollments.map((e) => ({
        id: e.id,
        courseId: e.courseId,
        courseTitle: e.course.title,
        courseLevel: e.course.level,
        status: e.status,
        enrolledAt: e.enrolledAt,
      })),
    }));
  res.json(students);
});

// GET /students/:id - teacher: one student; student: only self
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const requestedId = req.params.id;
  if (!isTeacher && requestedId !== req.user!.id) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: requestedId, role: UserRole.STUDENT },
    include: {
      studentProfile: {
        include: {
          enrollments: { include: { course: true } },
        },
      },
    },
  });
  if (!user || !user.studentProfile) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`,
    level: user.studentProfile.level,
    phone: user.studentProfile.phone,
    notes: user.studentProfile.notes,
    enrollments: user.studentProfile.enrollments,
  });
});

// POST /students - teacher only: create student (user + studentProfile) + optional enrollments
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, level, phone, notes, courseIds } = req.body as {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    level?: string;
    phone?: string;
    notes?: string;
    courseIds?: string[];
  };
  if (!email || !firstName || !lastName) {
    res.status(400).json({ error: 'email, firstName and lastName required' });
    return;
  }
  const existing = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (existing) {
    res.status(409).json({ error: 'Email já cadastrado' });
    return;
  }
  const hashed = password ? await bcrypt.hash(password, 10) : await bcrypt.hash('changeme123', 10);
  const user = await prisma.user.create({
    data: {
      email: email.trim().toLowerCase(),
      password: hashed,
      role: UserRole.STUDENT,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      studentProfile: {
        create: {
          level: level || null,
          phone: phone || null,
          notes: notes || null,
        },
      },
    },
    include: { studentProfile: true },
  });
  const profileId = user.studentProfile!.id;
  if (Array.isArray(courseIds) && courseIds.length) {
    await prisma.enrollment.createMany({
      data: courseIds.map((courseId) => ({
        studentId: profileId,
        courseId,
        status: 'ACTIVE',
      })),
      skipDuplicates: true,
    });
  }
  const withEnrollments = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      studentProfile: { include: { enrollments: { include: { course: true } } } },
    },
  });
  res.status(201).json({
    id: withEnrollments!.id,
    email: withEnrollments!.email,
    firstName: withEnrollments!.firstName,
    lastName: withEnrollments!.lastName,
    name: `${withEnrollments!.firstName} ${withEnrollments!.lastName}`,
    level: withEnrollments!.studentProfile!.level,
    phone: withEnrollments!.studentProfile!.phone,
    notes: withEnrollments!.studentProfile!.notes,
    enrollments: withEnrollments!.studentProfile!.enrollments,
  });
});

// PATCH /students/:id - teacher or self (student can update limited fields)
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const requestedId = req.params.id;
  if (!isTeacher && requestedId !== req.user!.id) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  const { firstName, lastName, level, phone, notes, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: requestedId },
    include: { studentProfile: true },
  });
  if (!user || user.role !== UserRole.STUDENT || !user.studentProfile) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  if (firstName != null) await prisma.user.update({ where: { id: requestedId }, data: { firstName } });
  if (lastName != null) await prisma.user.update({ where: { id: requestedId }, data: { lastName } });
  if (password != null && (isTeacher || requestedId === req.user!.id)) {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { id: requestedId }, data: { password: hashed } });
  }
  if (level != null || phone != null || notes != null) {
    await prisma.studentProfile.update({
      where: { id: user.studentProfile.id },
      data: {
        ...(level != null && { level }),
        ...(phone != null && { phone }),
        ...(notes != null && { notes }),
      },
    });
  }
  const updated = await prisma.user.findUnique({
    where: { id: requestedId },
    include: { studentProfile: { include: { enrollments: { include: { course: true } } } } },
  });
  res.json(updated);
});

// DELETE /students/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
