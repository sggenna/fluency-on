import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { Router } from 'express';

const router = Router();

/** GET /api/setup/validate?token=xxx - validate setup token, return user info (no auth) */
router.get('/validate', async (req: Request, res: Response) => {
  try {
    const token = typeof req.query.token === 'string' ? req.query.token.trim() : '';
    if (!token) {
      return res.status(400).json({ error: 'Token não informado' });
    }

    const setupToken = await prisma.setupToken.findUnique({
      where: { token },
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
    });

    if (!setupToken) {
      return res.status(404).json({ error: 'Link inválido ou já utilizado' });
    }
    if (new Date() > setupToken.expiresAt) {
      await prisma.setupToken.delete({ where: { id: setupToken.id } }).catch(() => {});
      return res.status(410).json({ error: 'Link expirado' });
    }

    res.json({
      email: setupToken.user.email,
      firstName: setupToken.user.firstName,
      lastName: setupToken.user.lastName,
    });
  } catch (e) {
    console.error('Setup validate error:', e);
    res.status(500).json({ error: 'Erro ao validar link' });
  }
});

export interface CompleteSetupBody {
  token: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/** POST /api/setup - set password and optionally update profile; consumes token */
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body as CompleteSetupBody;
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : undefined;
    const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : undefined;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined;

    if (!token) {
      return res.status(400).json({ error: 'Token não informado' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    const setupToken = await prisma.setupToken.findUnique({
      where: { token },
      include: { user: { include: { studentProfile: true } } },
    });

    if (!setupToken) {
      return res.status(404).json({ error: 'Link inválido ou já utilizado' });
    }
    if (new Date() > setupToken.expiresAt) {
      await prisma.setupToken.delete({ where: { id: setupToken.id } }).catch(() => {});
      return res.status(410).json({ error: 'Link expirado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: setupToken.userId },
        data: {
          password: hashedPassword,
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
        },
      });
      if (setupToken.user.studentProfile && phone !== undefined) {
        await tx.studentProfile.update({
          where: { id: setupToken.user.studentProfile.id },
          data: { phone: phone || null },
        });
      }
      await tx.setupToken.delete({ where: { id: setupToken.id } });
    });

    res.json({ success: true, message: 'Conta ativada. Faça login com seu e-mail e senha.' });
  } catch (e) {
    console.error('Setup complete error:', e);
    res.status(500).json({ error: 'Erro ao ativar conta' });
  }
});

export default router;
