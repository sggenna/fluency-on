import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';

const router = Router();

// GET /submissions?assignmentId= - teacher: all for assignment; student: own
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const { assignmentId } = req.query;
  if (!assignmentId || typeof assignmentId !== 'string') {
    res.status(400).json({ error: 'assignmentId required' });
    return;
  }
  const isTeacher = req.user!.role === 'TEACHER' || req.user!.role === 'ADMIN';
  const submissions = await prisma.submission.findMany({
    where: {
      assignmentId,
      ...(isTeacher ? {} : { studentId: req.user!.id }),
    },
    include: {
      assignment: { include: { lesson: { include: { course: true } } } },
      ...(isTeacher && { student: { select: { id: true, firstName: true, lastName: true, email: true } } }),
    },
  });
  res.json(submissions);
});

// POST /submissions - student: submit; body: assignmentId, fileUrl?
router.post('/', requireAuth, async (req: Request, res: Response) => {
  if (req.user!.role !== 'STUDENT') {
    res.status(403).json({ error: 'Only students can submit' });
    return;
  }
  const { assignmentId, fileUrl } = req.body;
  if (!assignmentId) {
    res.status(400).json({ error: 'assignmentId required' });
    return;
  }
  const existing = await prisma.submission.findFirst({
    where: { assignmentId, studentId: req.user!.id },
  });
  const submission = existing
    ? await prisma.submission.update({
        where: { id: existing.id },
        data: { fileUrl: fileUrl ?? existing.fileUrl },
        include: { assignment: { include: { lesson: true } } },
      })
    : await prisma.submission.create({
        data: {
          assignmentId,
          studentId: req.user!.id,
          fileUrl: fileUrl || null,
          status: 'PENDING',
        },
        include: { assignment: { include: { lesson: true } } },
      });
  res.status(existing ? 200 : 201).json(submission);
});

// PATCH /submissions/:id - teacher: grade (score, feedback); student: no
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { score, feedback, status } = req.body;
  const submission = await prisma.submission.update({
    where: { id: req.params.id },
    data: {
      ...(score != null && { score }),
      ...(feedback != null && { feedback }),
      ...(status && { status }),
      ...((score != null || feedback != null || status === 'GRADED') && { gradedAt: new Date(), status: 'GRADED' }),
    },
    include: { student: { select: { id: true, firstName: true, lastName: true } }, assignment: true },
  });
  res.json(submission);
});

export default router;
