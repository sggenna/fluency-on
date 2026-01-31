import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { UserRole } from '@prisma/client';
import { requireAuth, signToken } from '../middleware/auth';

const router = Router();

// POST /auth/login - email, password, role?: STUDENT | TEACHER (optional, to validate)
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body as { email?: string; password?: string; role?: UserRole };

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: {
        studentProfile: { select: { id: true, level: true } },
        teacherProfile: { select: { id: true } },
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Email ou senha inválidos' });
      return;
    }

    let valid = false;
    try {
      valid = await bcrypt.compare(password, user.password);
    } catch (bcryptErr) {
      console.error('Login bcrypt error (invalid hash?):', bcryptErr);
      res.status(500).json({
        error: 'Erro ao verificar senha. Execute o seed: npx prisma db seed',
        message: bcryptErr instanceof Error ? bcryptErr.message : String(bcryptErr),
      });
      return;
    }

    if (!valid) {
      res.status(401).json({ error: 'Email ou senha inválidos' });
      return;
    }

    if (role && user.role !== role) {
      res.status(403).json({ error: 'Acesso não permitido para este portal' });
      return;
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        studentProfileId: user.studentProfile?.id,
        teacherProfileId: user.teacherProfile?.id,
        level: user.studentProfile?.level,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    if (res.headersSent) return;
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({
      error: 'Erro ao fazer login',
      message,
    });
  }
});

// POST /auth/register - student self-registration (optional; teacher creates students via API)
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, level, phone } = req.body as {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    level?: string;
    phone?: string;
  };

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ error: 'Email, password, firstName and lastName required' });
    return;
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (existing) {
    res.status(409).json({ error: 'Email já cadastrado' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email.trim().toLowerCase(),
      password: hashed,
      role: UserRole.STUDENT,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      studentProfile: {
        create: { level: level || null, phone: phone || null },
      },
    },
    include: {
      studentProfile: { select: { id: true, level: true } },
    },
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      studentProfileId: user.studentProfile?.id,
      level: user.studentProfile?.level,
    },
  });
});

// GET /auth/me - current user (requires token)
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  const u = req.user!;
  const user = await prisma.user.findUnique({
    where: { id: u.id },
    include: {
      studentProfile: { select: { id: true, level: true, phone: true } },
      teacherProfile: { select: { id: true, bio: true } },
    },
  });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    studentProfileId: user.studentProfile?.id,
    teacherProfileId: user.teacherProfile?.id,
    level: user.studentProfile?.level,
    phone: user.studentProfile?.phone,
    bio: user.teacherProfile?.bio,
  });
});

export default router;
