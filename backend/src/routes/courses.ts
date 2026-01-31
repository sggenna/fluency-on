import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /courses - list (students: active only; teachers: all)
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const courses = await prisma.course.findMany({
    where: isTeacher ? {} : { isActive: true },
    orderBy: { level: 'asc' },
    include: {
      _count: { select: { lessons: true, enrollments: true } },
    },
  });
  res.json(courses);
});

// GET /courses/:id - single with lessons & materials
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({
    where: { id: req.params.id },
    include: {
      lessons: { orderBy: { order: 'asc' } },
      materials: { orderBy: { order: 'asc' } },
      _count: { select: { enrollments: true } },
    },
  });
  if (!course) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }
  res.json(course);
});

// POST /courses - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, description, level, thumbnail, isActive } = req.body;
  if (!title || !level) {
    res.status(400).json({ error: 'title and level required' });
    return;
  }
  const course = await prisma.course.create({
    data: {
      title,
      description: description || null,
      level,
      thumbnail: thumbnail || null,
      isActive: isActive !== false,
    },
  });
  res.status(201).json(course);
});

// PATCH /courses/:id - teacher only
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, description, level, thumbnail, isActive } = req.body;
  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: {
      ...(title != null && { title }),
      ...(description != null && { description }),
      ...(level != null && { level }),
      ...(thumbnail != null && { thumbnail }),
      ...(typeof isActive === 'boolean' && { isActive }),
    },
  });
  res.json(course);
});

// DELETE /courses/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.course.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
