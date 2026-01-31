import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /progress - student: my progress; teacher: ?studentId=
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const { studentId } = req.query;

  if (isTeacher && typeof studentId === 'string') {
    const progress = await prisma.progress.findMany({
      where: { studentId },
      include: { lesson: { include: { course: true } } },
    });
    return res.json(progress);
  }

  if (!isTeacher) {
    const progress = await prisma.progress.findMany({
      where: { studentId: req.user!.id },
      include: { lesson: { include: { course: true } } },
    });
    return res.json(progress);
  }

  res.status(400).json({ error: 'studentId required for teacher' });
});

// POST /progress - student: upsert my progress (lessonId, completed?, watched?, watchTime?)
router.post('/', requireAuth, async (req: Request, res: Response) => {
  if (req.user!.role !== 'STUDENT') {
    res.status(403).json({ error: 'Only students can update progress' });
    return;
  }
  const { lessonId, completed, watched, watchTime } = req.body;
  if (!lessonId) {
    res.status(400).json({ error: 'lessonId required' });
    return;
  }
  const progress = await prisma.progress.upsert({
    where: {
      studentId_lessonId: { studentId: req.user!.id, lessonId },
    },
    create: {
      studentId: req.user!.id,
      lessonId,
      completed: completed === true,
      watched: watched === true,
      watchTime: watchTime ?? 0,
      completedAt: completed === true ? new Date() : null,
    },
    update: {
      ...(typeof completed === 'boolean' && { completed, completedAt: completed ? new Date() : null }),
      ...(typeof watched === 'boolean' && { watched }),
      ...(typeof watchTime === 'number' && { watchTime }),
    },
    include: { lesson: true },
  });
  res.json(progress);
});

// PATCH /progress/:id - student: update own
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  const progress = await prisma.progress.findUnique({
    where: { id: req.params.id },
  });
  if (!progress) {
    res.status(404).json({ error: 'Progress not found' });
    return;
  }
  if (progress.studentId !== req.user!.id) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  const { completed, watched, watchTime } = req.body;
  const updated = await prisma.progress.update({
    where: { id: req.params.id },
    data: {
      ...(typeof completed === 'boolean' && { completed, completedAt: completed ? new Date() : null }),
      ...(typeof watched === 'boolean' && { watched }),
      ...(typeof watchTime === 'number' && { watchTime }),
    },
    include: { lesson: true },
  });
  res.json(updated);
});

export default router;
