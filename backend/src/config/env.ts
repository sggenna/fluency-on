/**
 * Validate required env vars and security settings on startup.
 * In production, fails fast if secrets are missing or weak.
 */
const isProduction = process.env.NODE_ENV === 'production';

const WEAK_SECRETS = [
  '',
  'change-me-in-production',
  'secret',
  'jwt_secret',
  'your-super-secret-jwt-key-change-this-in-production',
];

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || WEAK_SECRETS.some((w) => secret.toLowerCase().trim() === w.toLowerCase())) {
    if (isProduction) {
      throw new Error(
        'JWT_SECRET must be set to a strong random string in production (32+ chars). Update backend/.env'
      );
    }
    return secret || 'dev-only-change-in-production';
  }
  if (secret.length < 32 && isProduction) {
    throw new Error('JWT_SECRET must be at least 32 characters in production.');
  }
  return secret;
}

export function validateEnv(): void {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error('DATABASE_URL is required. Set it in backend/.env');
  }
  getJWTSecret();
  if (isProduction && !process.env.ALLOWED_ORIGINS?.trim()) {
    throw new Error(
      'ALLOWED_ORIGINS is required in production (e.g. https://yourapp.com). Set it in backend/.env'
    );
  }
}

export function getValidatedJWTSecret(): string {
  return getJWTSecret();
}

export function getCorsOrigin(): string | string[] | boolean {
  const allowed = process.env.ALLOWED_ORIGINS;
  if (allowed?.trim()) {
    return allowed.split(',').map((o) => o.trim()).filter(Boolean);
  }
  if (isProduction) {
    return false;
  }
  return true;
}
