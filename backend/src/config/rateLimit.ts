/**
 * Rate limiters: general API + strict login to prevent brute force.
 */
import rateLimit from 'express-rate-limit';

const windowMs = 15 * 60 * 1000; // 15 minutes

/** General API: 200 requests per 15 min per IP */
export const apiLimiter = rateLimit({
  windowMs,
  max: 200,
  message: { error: 'Muitas requisições. Tente novamente em alguns minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/** Login: 5 attempts per 15 min per IP to prevent brute force */
export const loginLimiter = rateLimit({
  windowMs,
  max: 5,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});
