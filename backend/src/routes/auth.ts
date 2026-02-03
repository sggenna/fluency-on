import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { UserRole } from '@prisma/client';
import { getValidatedJWTSecret } from '../config/env';
import { loginLimiter } from '../config/rateLimit';

const router = Router();
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

/** POST /api/auth/login - email + password, returns token + user (rate limited) */
router.post('/login', loginLimiter, async (req: Request<object, object, LoginBody>, res: Response) => {
  try {
    const secret = getValidatedJWTSecret();
    const { email, password } = req.body || {};
    const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const rawPassword = typeof password === 'string' ? password : '';
    if (!trimmedEmail || !rawPassword) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    if (trimmedEmail.length > 255 || rawPassword.length > 1024) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const valid = await bcrypt.compare(rawPassword, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const payload: AuthUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

    res.json({
      token,
      user: payload,
    });
  } catch (e) {
    console.error('Auth login error:', e);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

/** GET /api/auth/me - requires Authorization: Bearer <token>, returns current user */
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: 'Token não informado' });
    }

    const decoded = jwt.verify(token, getValidatedJWTSecret()) as AuthUser;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        studentProfile: { select: { phone: true } },
        teacherProfile: { select: { bio: true } },
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const profile =
      user.role === 'STUDENT' && user.studentProfile
        ? { phone: user.studentProfile.phone }
        : user.role === 'TEACHER' && user.teacherProfile
          ? { bio: user.teacherProfile.bio }
          : undefined;

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profile,
      },
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
    console.error('Auth me error:', e);
    res.status(500).json({ error: 'Erro ao validar sessão' });
  }
});

export interface UpdateMeBody {
  email?: string;
  currentPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/** PATCH /api/auth/me - update current user profile (email requires currentPassword) */
router.patch('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: 'Token não informado' });
    }

    const decoded = jwt.verify(token, getValidatedJWTSecret()) as AuthUser;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { studentProfile: true, teacherProfile: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const body = (req.body || {}) as UpdateMeBody;
    const newEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : undefined;
    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : undefined;
    const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : undefined;
    const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : undefined;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined;

    if (newEmail !== undefined) {
      if (newEmail.length > 255) {
        return res.status(400).json({ error: 'E-mail inválido' });
      }
      if (newEmail !== user.email) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Informe sua senha atual para alterar o e-mail' });
        }
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
          return res.status(401).json({ error: 'Senha atual incorreta' });
        }
        const existing = await prisma.user.findUnique({ where: { email: newEmail } });
        if (existing) {
          return res.status(409).json({ error: 'Este e-mail já está em uso' });
        }
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          ...(newEmail !== undefined && { email: newEmail }),
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
        },
      });
      if (user.role === UserRole.STUDENT && user.studentProfile && phone !== undefined) {
        await tx.studentProfile.update({
          where: { id: user.studentProfile.id },
          data: { phone: phone || null },
        });
      }
    });

    const updated = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, role: true, firstName: true, lastName: true },
    });

    if (!updated) {
      return res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }

    res.json({
      user: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
        firstName: updated.firstName,
        lastName: updated.lastName,
      },
    });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
    console.error('Auth me patch error:', e);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

export default router;
