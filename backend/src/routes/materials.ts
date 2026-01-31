import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { requireAuth, requireTeacher } from '../middleware/auth';
import { MaterialType } from '@prisma/client';

const router = Router();

// GET /materials?courseId=&lessonId= - filter by course and/or lesson
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const { courseId, lessonId } = req.query;
  const where: { courseId?: string; lessonId?: string } = {};
  if (typeof courseId === 'string') where.courseId = courseId;
  if (typeof lessonId === 'string') where.lessonId = lessonId;
  const materials = await prisma.material.findMany({
    where: Object.keys(where).length ? where : undefined,
    orderBy: [{ courseId: 'asc' }, { lessonId: 'asc' }, { order: 'asc' }],
  });
  res.json(materials);
});

// GET /materials/:id
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  const material = await prisma.material.findUnique({
    where: { id: req.params.id },
  });
  if (!material) {
    res.status(404).json({ error: 'Material not found' });
    return;
  }
  res.json(material);
});

// POST /materials - teacher only
router.post('/', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { courseId, lessonId, title, type, fileUrl, fileSize, mimeType, order } = req.body;
  if (!title || !type || !fileUrl) {
    res.status(400).json({ error: 'title, type and fileUrl required' });
    return;
  }
  const validType = Object.values(MaterialType).includes(type);
  if (!validType) {
    res.status(400).json({ error: 'Invalid material type' });
    return;
  }
  const material = await prisma.material.create({
    data: {
      courseId: courseId || null,
      lessonId: lessonId || null,
      title,
      type,
      fileUrl,
      fileSize: fileSize ?? null,
      mimeType: mimeType || null,
      order: order ?? 0,
    },
  });
  res.status(201).json(material);
});

// PATCH /materials/:id - teacher only
router.patch('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  const { title, type, fileUrl, fileSize, mimeType, order, courseId, lessonId } = req.body;
  const material = await prisma.material.update({
    where: { id: req.params.id },
    data: {
      ...(title != null && { title }),
      ...(type != null && { type }),
      ...(fileUrl != null && { fileUrl }),
      ...(fileSize != null && { fileSize }),
      ...(mimeType != null && { mimeType }),
      ...(order != null && { order }),
      ...(courseId != null && { courseId }),
      ...(lessonId != null && { lessonId }),
    },
  });
  res.json(material);
});

// DELETE /materials/:id - teacher only
router.delete('/:id', requireAuth, requireTeacher, async (req: Request, res: Response) => {
  await prisma.material.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
