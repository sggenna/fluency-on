/**
 * Send transactional emails (e.g. student setup invitation).
 * Uses Resend when RESEND_API_KEY is set; otherwise logs to console (dev).
 * Reads env at call time so dotenv has already loaded .env.
 */
import { Resend } from 'resend';

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  return key ? new Resend(key) : null;
}

function getFrom(): string {
  return process.env.RESEND_FROM?.trim() || 'FluencyOn <onboarding@resend.dev>';
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY?.trim();
}

export interface SendSetupEmailParams {
  to: string;
  studentName: string;
  setupLink: string;
}

export async function sendSetupEmail(params: SendSetupEmailParams): Promise<{ ok: boolean; error?: string }> {
  const { to, studentName, setupLink } = params;

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #253439;">Bem-vindo(a) ao FluencyOn</h2>
      <p>Olá, ${escapeHtml(studentName)}!</p>
      <p>Você foi cadastrado(a) como aluno na plataforma FluencyOn. Para acessar sua conta, crie sua senha clicando no link abaixo:</p>
      <p style="margin: 24px 0;">
        <a href="${escapeHtml(setupLink)}" style="display: inline-block; padding: 12px 24px; background: #fbb80f; color: #253439; text-decoration: none; font-weight: 600; border-radius: 8px;">Criar minha senha e acessar</a>
      </p>
      <p style="color: #7c898b; font-size: 14px;">Este link é válido por 7 dias. Se você não solicitou este cadastro, pode ignorar este e-mail.</p>
      <p style="color: #7c898b; font-size: 12px; margin-top: 32px;">FluencyOn – Transforme Seu Inglês em Confiança Real</p>
    </div>
  `;

  const resend = getResendClient();
  const from = getFrom();

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to: [to],
        subject: 'Ative sua conta no FluencyOn',
        html,
      });
      if (error) {
        console.error('[EMAIL] Resend error sending to', to, ':', error.message);
        return { ok: false, error: error.message };
      }
      console.log('[EMAIL] Setup email sent to', to, '(id:', data?.id || '—', ')');
      return { ok: true };
    } catch (e) {
      console.error('[EMAIL] Send failed to', to, ':', e);
      return { ok: false, error: e instanceof Error ? e.message : 'Failed to send email' };
    }
  }

  // No API key: log link so you can test manually
  console.log('[EMAIL] RESEND_API_KEY not set – link not sent by email:');
  console.log('  To:', to);
  console.log('  Link:', setupLink);
  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
