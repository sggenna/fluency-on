import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /assignments?lessonId= - list by lesson
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const { lessonId } = req.query;
  if (!lessonId || typeof lessonId !== 'string') {
    res.status(400).json({ error: 'lessonId required' });
    return;
  }
  const assignments = await prisma.assignment.findMany({
    where: { lessonId },
    include: { lesson: { select: { id: true, title: true, courseId: true, course: { select: { title: true } } } } },
  });
  res.json(assignments);
});

// GET /assignments/:id - single with submissions (teacher) or own submission (student)
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const assignment = await prisma.assignment.findUnique({
    where: { id: req.params.id },
    include: {
      lesson: { include: { course: true } },
      submissions: req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN'
        ? { include: { student: { select: { id: true, firstName: true, lastName: true, email: true } } } }
        : { where: { studentId: req.user!.id } },
    },
  });
  if (!assignment) {
    res.status(404).json({ error: 'Assignment not found' });
    return;
  }
  res.json(assignment);
});

// POST /assignments - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { lessonId, title, description, dueDate, maxScore } = req.body;
  if (!lessonId || !title) {
    res.status(400).json({ error: 'lessonId and title required' });
    return;
  }
  const assignment = await prisma.assignment.create({
    data: {
      lessonId,
      title,
      description: description || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      maxScore: maxScore ?? 100,
    },
  });
  res.status(201).json(assignment);
});

// PATCH /assignments/:id - teacher only
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, description, dueDate, maxScore } = req.body;
  const assignment = await prisma.assignment.update({
    where: { id: req.params.id },
    data: {
      ...(title != null && { title }),
      ...(description != null && { description }),
      ...(dueDate != null && { dueDate: new Date(dueDate) }),
      ...(maxScore != null && { maxScore }),
    },
  });
  res.json(assignment);
});

// DELETE /assignments/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.assignment.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
