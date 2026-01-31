import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /lessons?courseId= - list by course
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const { courseId } = req.query;
  if (!courseId || typeof courseId !== 'string') {
    res.status(400).json({ error: 'courseId required' });
    return;
  }
  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { assignments: true } },
    },
  });
  res.json(lessons);
});

// GET /lessons/:id - single with assignments & materials
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: req.params.id },
    include: {
      course: { select: { id: true, title: true, level: true } },
      assignments: true,
      materials: { orderBy: { order: 'asc' } },
    },
  });
  if (!lesson) {
    res.status(404).json({ error: 'Lesson not found' });
    return;
  }
  res.json(lesson);
});

// POST /lessons - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { courseId, title, description, videoUrl, order, duration, isPublished } = req.body;
  if (!courseId || !title) {
    res.status(400).json({ error: 'courseId and title required' });
    return;
  }
  const lesson = await prisma.lesson.create({
    data: {
      courseId,
      title,
      description: description || null,
      videoUrl: videoUrl || null,
      order: order ?? 0,
      duration: duration ?? null,
      isPublished: isPublished === true,
    },
  });
  res.status(201).json(lesson);
});

// PATCH /lessons/:id - teacher only
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, description, videoUrl, order, duration, isPublished } = req.body;
  const lesson = await prisma.lesson.update({
    where: { id: req.params.id },
    data: {
      ...(title != null && { title }),
      ...(description != null && { description }),
      ...(videoUrl != null && { videoUrl }),
      ...(order != null && { order }),
      ...(duration != null && { duration }),
      ...(typeof isPublished === 'boolean' && { isPublished }),
    },
  });
  res.json(lesson);
});

// DELETE /lessons/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.lesson.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
