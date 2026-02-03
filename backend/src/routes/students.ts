import { Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import prisma from '../utils/prisma';
import { UserRole } from '@prisma/client';
import { requireTeacher, AuthRequest } from '../middleware/auth';
import { sendSetupEmail } from '../utils/email';
import { Router } from 'express';

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL?.trim() || 'http://localhost:5173';
const SETUP_TOKEN_EXPIRY_DAYS = 7;

function parseName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return { firstName: '', lastName: '' };
  const space = trimmed.indexOf(' ');
  if (space === -1) return { firstName: trimmed, lastName: '' };
  return {
    firstName: trimmed.slice(0, space).trim(),
    lastName: trimmed.slice(space).trim(),
  };
}

export interface CreateStudentBody {
  name: string;
  email: string;
  phone: string;
  level: string;
  courses?: string[];
  cpf?: string;
  rg?: string;
  birthDate?: string;
  profession?: string;
  notes?: string;
  contractUrl?: string;
}

/** GET /api/students - teacher only: list all students */
router.get('/', requireTeacher, async (_req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: UserRole.STUDENT },
      include: { studentProfile: true },
      orderBy: { createdAt: 'desc' },
    });
    const students = users.map((u) => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.email,
      phone: u.studentProfile?.phone ?? '',
      level: u.studentProfile?.level ?? '',
      cpf: u.studentProfile?.cpf ?? undefined,
      rg: u.studentProfile?.rg ?? undefined,
      dateOfBirth: u.studentProfile?.dateOfBirth?.toISOString().slice(0, 10),
      profession: u.studentProfile?.profession ?? undefined,
      notes: u.studentProfile?.notes ?? undefined,
      enrollmentDate: u.createdAt.toISOString().slice(0, 10),
      courses: [] as string[],
      status: 'active' as const,
      progress: 0,
    }));
    res.json({ students });
  } catch (e) {
    console.error('List students error:', e);
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
});

/** POST /api/students - teacher only: create student user + profile + setup token, send email */
router.post('/', requireTeacher, async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body as CreateStudentBody;
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const level = typeof body.level === 'string' ? body.level.trim() : '';
    const courses = Array.isArray(body.courses) ? body.courses : [];
    const cpf = typeof body.cpf === 'string' ? body.cpf.trim() || undefined : undefined;
    const rg = typeof body.rg === 'string' ? body.rg.trim() || undefined : undefined;
    const birthDate = typeof body.birthDate === 'string' && body.birthDate ? body.birthDate : undefined;
    const profession = typeof body.profession === 'string' ? body.profession.trim() || undefined : undefined;
    const notes = typeof body.notes === 'string' ? body.notes.trim() || undefined : undefined;
    const contractUrl = typeof body.contractUrl === 'string' ? body.contractUrl.trim() || undefined : undefined;

    if (!email || !name) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
    }
    if (email.length > 255) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const isStudent = existing.role === UserRole.STUDENT;
      const hint = isStudent
        ? ' Você pode reenviar o e-mail de ativação para este aluno usando o botão abaixo.'
        : ' Use outro e-mail para cadastrar um novo aluno.';
      return res.status(409).json({
        error: 'Já existe um usuário com este e-mail.' + hint,
        code: 'EMAIL_TAKEN',
        existingStudentId: isStudent ? existing.id : undefined,
      });
    }

    const { firstName, lastName } = parseName(name);
    const tempPassword = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SETUP_TOKEN_EXPIRY_DAYS);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: UserRole.STUDENT,
        firstName: firstName || 'Aluno',
        lastName: lastName || '',
        studentProfile: {
          create: {
            level: level || null,
            phone: phone || null,
            notes: notes || null,
            contractUrl: contractUrl || null,
            cpf: cpf || null,
            rg: rg || null,
            dateOfBirth: birthDate ? new Date(birthDate) : null,
            profession: profession || null,
          },
        },
        setupTokens: {
          create: {
            token,
            expiresAt,
          },
        },
      },
      include: {
        studentProfile: true,
      },
    });

    const baseUrl = FRONTEND_URL.replace(/\/$/, '');
    const setupLink = `${baseUrl}/app/setup-profile?token=${encodeURIComponent(token)}`;

    const emailResult = await sendSetupEmail({
      to: email,
      studentName: name,
      setupLink,
    });

    if (!emailResult.ok) {
      console.error('[STUDENTS] Setup email failed for', email, ':', emailResult.error);
    }

    res.status(201).json({
      success: true,
      student: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.studentProfile
          ? {
              level: user.studentProfile.level,
              phone: user.studentProfile.phone,
              cpf: user.studentProfile.cpf,
              rg: user.studentProfile.rg,
              dateOfBirth: user.studentProfile.dateOfBirth?.toISOString().slice(0, 10),
              profession: user.studentProfile.profession,
            }
          : null,
      },
      setupLink,
      emailSent: emailResult.ok,
    });
  } catch (e) {
    console.error('Create student error:', e);
    res.status(500).json({ error: 'Erro ao cadastrar aluno' });
  }
});

/** POST /api/students/:id/resend-setup - teacher only: create new setup token and send email to existing student */
router.post('/:id/resend-setup', requireTeacher, async (req: AuthRequest, res: Response) => {
  try {
    const userId = typeof req.params.id === 'string' ? req.params.id.trim() : '';
    if (!userId) {
      return res.status(400).json({ error: 'ID do aluno é obrigatório' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId, role: UserRole.STUDENT },
      include: { studentProfile: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await prisma.setupToken.deleteMany({ where: { userId } });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SETUP_TOKEN_EXPIRY_DAYS);

    await prisma.setupToken.create({
      data: { token, userId, expiresAt },
    });

    const baseUrl = FRONTEND_URL.replace(/\/$/, '');
    const setupLink = `${baseUrl}/app/setup-profile?token=${encodeURIComponent(token)}`;
    const studentName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

    const emailResult = await sendSetupEmail({
      to: user.email,
      studentName,
      setupLink,
    });

    if (!emailResult.ok) {
      console.error('[STUDENTS] Resend setup email failed for', user.email, ':', emailResult.error);
    }

    res.json({
      success: true,
      setupLink,
      emailSent: emailResult.ok,
    });
  } catch (e) {
    console.error('Resend setup error:', e);
    res.status(500).json({ error: 'Erro ao reenviar e-mail de ativação' });
  }
});

export interface UpdateStudentBody {
  name?: string;
  phone?: string;
  level?: string;
  notes?: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
  profession?: string;
  contractUrl?: string;
}

/** PATCH /api/students/:id - teacher only: update student details */
router.patch('/:id', requireTeacher, async (req: AuthRequest, res: Response) => {
  try {
    const userId = typeof req.params.id === 'string' ? req.params.id.trim() : '';
    if (!userId) {
      return res.status(400).json({ error: 'ID do aluno é obrigatório' });
    }

    const body = req.body as UpdateStudentBody;
    const name = typeof body.name === 'string' ? body.name.trim() : undefined;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined;
    const level = typeof body.level === 'string' ? body.level.trim() : undefined;
    const notes = typeof body.notes === 'string' ? body.notes.trim() : undefined;
    const cpf = typeof body.cpf === 'string' ? body.cpf.trim() : undefined;
    const rg = typeof body.rg === 'string' ? body.rg.trim() : undefined;
    const birthDate = typeof body.birthDate === 'string' && body.birthDate ? body.birthDate : undefined;
    const profession = typeof body.profession === 'string' ? body.profession.trim() : undefined;
    const contractUrl = typeof body.contractUrl === 'string' ? body.contractUrl.trim() : undefined;

    const user = await prisma.user.findUnique({
      where: { id: userId, role: UserRole.STUDENT },
      include: { studentProfile: true },
    });

    if (!user || !user.studentProfile) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    const profileId = user.studentProfile.id;
    const updates: { firstName?: string; lastName?: string } = {};
    if (name !== undefined) {
      const { firstName, lastName } = parseName(name);
      updates.firstName = firstName || user.firstName;
      updates.lastName = lastName || user.lastName;
    }

    await prisma.$transaction(async (tx) => {
      if (Object.keys(updates).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: updates,
        });
      }
      await tx.studentProfile.update({
        where: { id: profileId },
        data: {
          ...(phone !== undefined && { phone: phone || null }),
          ...(level !== undefined && { level: level || null }),
          ...(notes !== undefined && { notes: notes || null }),
          ...(cpf !== undefined && { cpf: cpf || null }),
          ...(rg !== undefined && { rg: rg || null }),
          ...(birthDate !== undefined && { dateOfBirth: birthDate ? new Date(birthDate) : null }),
          ...(profession !== undefined && { profession: profession || null }),
          ...(contractUrl !== undefined && { contractUrl: contractUrl || null }),
        },
      });
    });

    const updated = await prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true },
    });

    if (!updated) {
      return res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }

    res.json({
      success: true,
      student: {
        id: updated.id,
        email: updated.email,
        firstName: updated.firstName,
        lastName: updated.lastName,
        profile: updated.studentProfile
          ? {
              level: updated.studentProfile.level,
              phone: updated.studentProfile.phone,
              cpf: updated.studentProfile.cpf,
              rg: updated.studentProfile.rg,
              dateOfBirth: updated.studentProfile.dateOfBirth?.toISOString().slice(0, 10),
              profession: updated.studentProfile.profession,
              notes: updated.studentProfile.notes,
            }
          : null,
      },
    });
  } catch (e) {
    console.error('Update student error:', e);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

export default router;
