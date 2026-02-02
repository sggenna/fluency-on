import { Router } from 'express';
import { uploadMiddleware } from '../utils/upload';

const router = Router();

router.post('/', uploadMiddleware.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  const filename = req.file.filename;
  const url = `/api/uploads/${filename}`;
  res.json({ url, filename });
});

export default router;
