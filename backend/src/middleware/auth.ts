import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getValidatedJWTSecret } from '../config/env';
import type { AuthUser } from '../routes/auth';

export interface AuthRequest extends Request {
  user?: AuthUser;
}

/** Require valid JWT; sets req.user. */
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: 'Token não informado' });
    return;
  }
  try {
    const decoded = jwt.verify(token, getValidatedJWTSecret()) as AuthUser;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

/** Require JWT and role TEACHER or ADMIN. */
export function requireTeacher(req: AuthRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (!req.user) return;
    if (req.user.role !== 'TEACHER' && req.user.role !== 'ADMIN') {
      res.status(403).json({ error: 'Acesso restrito a professores' });
      return;
    }
    next();
  });
}
