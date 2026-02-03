import { Router } from 'express';
import { uploadMiddleware, isUsingR2 } from '../utils/upload';
import { uploadToR2, getR2Key } from '../utils/storage';

const router = Router();

router.post('/', uploadMiddleware.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    if (isUsingR2 && req.file.buffer) {
      const key = getR2Key(req.file.originalname || 'file');
      const url = await uploadToR2(key, req.file.buffer, req.file.mimetype);
      return res.json({ url, filename: key });
    }

    const filename = req.file.filename;
    const url = `/api/uploads/${filename}`;
    res.json({ url, filename });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
  }
});

export default router;
