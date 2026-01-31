import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import coursesRoutes from './routes/courses';
import lessonsRoutes from './routes/lessons';
import materialsRoutes from './routes/materials';
import studentsRoutes from './routes/students';
import enrollmentsRoutes from './routes/enrollments';
import assignmentsRoutes from './routes/assignments';
import submissionsRoutes from './routes/submissions';
import progressRoutes from './routes/progress';
import announcementsRoutes from './routes/announcements';
import schedulesRoutes from './routes/schedules';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'FluencyOn API is running' });
});

// Hint if someone hits the backend URL for the app (frontend runs on a different port)
app.get('/app', (_req, res) => {
  res.status(404).json({
    error: 'This is the API server (port 3001). Open the frontend instead.',
    frontend: 'Run "npm run dev" in the project root, then open http://localhost:3000/app (or the port Vite shows)',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/schedules', schedulesRoutes);

// Global error handler – always return JSON and log the error
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  const message = err instanceof Error ? err.message : String(err);
  res.status(500).json({ error: 'Erro no servidor', message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`📚 API: http://localhost:${PORT}/api`);
});

