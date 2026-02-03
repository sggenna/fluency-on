import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { validateEnv, getCorsOrigin } from './config/env';
import { apiLimiter } from './config/rateLimit';
import uploadRoute from './routes/upload';
import authRoute from './routes/auth';
import studentsRoute from './routes/students';
import setupRoute from './routes/setup';
import { isResendConfigured } from './utils/email';

dotenv.config();

validateEnv();

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const corsOrigin = getCorsOrigin();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(apiLimiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api/auth', authRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/students', studentsRoute);
app.use('/api/setup', setupRoute);
app.use('/api/uploads', express.static(UPLOAD_DIR));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'FluencyOn API is running' });
});

// Email config check (so you can verify RESEND_API_KEY is loaded)
app.get('/api/email-status', (req, res) => {
  res.json({ resendConfigured: isResendConfigured() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📧 Email: ${isResendConfigured() ? 'Resend configured – setup emails will be sent' : 'RESEND_API_KEY not set – setup links only in console'}`);
});

