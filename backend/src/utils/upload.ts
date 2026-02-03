import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { isR2Configured } from './storage';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Local disk: 50MB (safe default). R2: 5GB for lecture videos and heavy material
const MAX_SIZE_LOCAL = 50 * 1024 * 1024; // 50MB
const MAX_SIZE_R2 = 5 * 1024 * 1024 * 1024; // 5GB

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = Buffer.from(file.originalname, 'latin1').toString('utf8').replace(/[^a-zA-Z0-9._-]/g, '_');
    const name = `${Date.now()}-${safe}`;
    cb(null, name);
  },
});

const memoryStorage = multer.memoryStorage();

const useR2 = isR2Configured();

export const uploadMiddleware = multer({
  storage: useR2 ? memoryStorage : diskStorage,
  limits: { fileSize: useR2 ? MAX_SIZE_R2 : MAX_SIZE_LOCAL },
});

export const isUsingR2 = useR2;
export const MAX_FILE_SIZE = useR2 ? MAX_SIZE_R2 : MAX_SIZE_LOCAL;
