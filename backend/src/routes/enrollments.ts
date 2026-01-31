import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /enrollments - student: my enrollments; teacher: ?studentId= or all
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const { studentId } = req.query;

  if (isTeacher && typeof studentId === 'string') {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true },
    });
    return res.json(enrollments);
  }

  if (!isTeacher) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.id },
    });
    if (!profile) return res.json([]);
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: profile.id, status: 'ACTIVE' },
      include: { course: { include: { _count: { select: { lessons: true } } } } },
    });
    return res.json(enrollments);
  }

  const enrollments = await prisma.enrollment.findMany({
    include: { course: true, student: { include: { user: true } } },
  });
  res.json(enrollments);
});

// POST /enrollments - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) {
    res.status(400).json({ error: 'studentId and courseId required' });
    return;
  }
  const enrollment = await prisma.enrollment.upsert({
    where: {
      studentId_courseId: { studentId, courseId },
    },
    create: { studentId, courseId, status: 'ACTIVE' },
    update: { status: 'ACTIVE' },
    include: { course: true, student: { include: { user: true } } },
  });
  res.status(201).json(enrollment);
});

// PATCH /enrollments/:id - teacher only (e.g. status)
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { status } = req.body;
  const enrollment = await prisma.enrollment.update({
    where: { id: req.params.id },
    data: { ...(status && { status }) },
    include: { course: true },
  });
  res.json(enrollment);
});

// DELETE /enrollments/:id - teacher only (or set CANCELLED)
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.enrollment.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
