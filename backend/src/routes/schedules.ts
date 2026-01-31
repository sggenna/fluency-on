import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /schedules - list class schedules (all active)
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const schedules = await prisma.classSchedule.findMany({
    where: { isActive: true },
    orderBy: [{ dayOfWeek: 'asc' }, { time: 'asc' }],
  });
  res.json(schedules);
});

// GET /schedules/:id
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const schedule = await prisma.classSchedule.findUnique({
    where: { id: req.params.id },
  });
  if (!schedule) {
    res.status(404).json({ error: 'Schedule not found' });
    return;
  }
  res.json(schedule);
});

// POST /schedules - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { dayOfWeek, time, level, maxStudents, meetUrl, isActive } = req.body;
  if (!dayOfWeek || !time || !level) {
    res.status(400).json({ error: 'dayOfWeek, time and level required' });
    return;
  }
  const schedule = await prisma.classSchedule.create({
    data: {
      dayOfWeek,
      time,
      level,
      maxStudents: maxStudents ?? 6,
      meetUrl: meetUrl || null,
      isActive: isActive !== false,
    },
  });
  res.status(201).json(schedule);
});

// PATCH /schedules/:id - teacher only
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { dayOfWeek, time, level, maxStudents, currentStudents, meetUrl, isActive } = req.body;
  const schedule = await prisma.classSchedule.update({
    where: { id: req.params.id },
    data: {
      ...(dayOfWeek != null && { dayOfWeek }),
      ...(time != null && { time }),
      ...(level != null && { level }),
      ...(maxStudents != null && { maxStudents }),
      ...(currentStudents != null && { currentStudents }),
      ...(meetUrl != null && { meetUrl }),
      ...(typeof isActive === 'boolean' && { isActive }),
    },
  });
  res.json(schedule);
});

// DELETE /schedules/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.classSchedule.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
