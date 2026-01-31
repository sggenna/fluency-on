import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { UserRole } from '@prisma/client';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /announcements - list (student: targetRole = STUDENT or null; teacher: all)
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const where = isTeacher
    ? { isActive: true }
    : {
        isActive: true,
        OR: [{ targetRole: UserRole.STUDENT }, { targetRole: null }],
      };
  const announcements = await prisma.announcement.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  res.json(announcements);
});

// GET /announcements/:id
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const announcement = await prisma.announcement.findUnique({
    where: { id: req.params.id },
  });
  if (!announcement) {
    res.status(404).json({ error: 'Announcement not found' });
    return;
  }
  res.json(announcement);
});

// POST /announcements - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, content, targetRole, isActive } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'title and content required' });
    return;
  }
  const validRole = targetRole == null || ['STUDENT', 'TEACHER', 'ADMIN'].includes(targetRole);
  if (!validRole) {
    res.status(400).json({ error: 'Invalid targetRole' });
    return;
  }
  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
      targetRole: targetRole || null,
      isActive: isActive !== false,
    },
  });
  res.status(201).json(announcement);
});

// PATCH /announcements/:id - teacher only
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, content, targetRole, isActive } = req.body;
  const announcement = await prisma.announcement.update({
    where: { id: req.params.id },
    data: {
      ...(title != null && { title }),
      ...(content != null && { content }),
      ...(targetRole != null && { targetRole }),
      ...(typeof isActive === 'boolean' && { isActive }),
    },
  });
  res.json(announcement);
});

// DELETE /announcements/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.announcement.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
