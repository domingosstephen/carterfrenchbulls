import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

// Simple in-memory rate limiter (resets per cold start — good enough for a small site)
const requestCounts = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;       // max requests
const WINDOW_MS = 60_000;   // per 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.reset) {
    requestCounts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot check
  if (body.website) {
    // Silently succeed — don't tell bots they failed
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate required fields
  const required = ['name', 'email', 'phone', 'country', 'state'];
  for (const field of required) {
    if (!body[field]?.trim()) {
      return new Response(JSON.stringify({ error: `Missing field: ${field}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resendKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.BREEDER_EMAIL;
  const fromEmail = import.meta.env.FROM_EMAIL || 'no-reply@carterfrenchbulls.com';

  if (!resendKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or BREEDER_EMAIL env vars');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(resendKey);

  const puppyLine = body.puppy ? `Interested in: ${body.puppy}` : 'No specific puppy selected';

  const breederEmailHtml = `
    <h2>New reservation request — Carter French Bulls</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px;">
      <tr><td style="padding:8px 12px;font-weight:600;width:140px;">Name</td><td style="padding:8px 12px;">${escHtml(body.name)}</td></tr>
      <tr style="background:#F6EBDD;"><td style="padding:8px 12px;font-weight:600;">Email</td><td style="padding:8px 12px;"><a href="mailto:${escHtml(body.email)}">${escHtml(body.email)}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;">Phone</td><td style="padding:8px 12px;"><a href="tel:${escHtml(body.phone.replace(/\D/g,''))}">${escHtml(body.phone)}</a></td></tr>
      <tr style="background:#F6EBDD;"><td style="padding:8px 12px;font-weight:600;">Location</td><td style="padding:8px 12px;">${escHtml(body.state)}, ${escHtml(body.country)}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;">Puppy</td><td style="padding:8px 12px;">${escHtml(puppyLine)}</td></tr>
      ${body.message ? `<tr style="background:#F6EBDD;"><td style="padding:8px 12px;font-weight:600;vertical-align:top;">Message</td><td style="padding:8px 12px;">${escHtml(body.message)}</td></tr>` : ''}
    </table>
    <p style="margin-top:24px;color:#6E625A;font-size:14px;">Sent from carterfrenchbulls.com</p>
  `;

  const visitorEmailHtml = `
    <p>Hi ${escHtml(body.name)},</p>
    <p>Thank you for reaching out to Carter French Bulls. We received your request and will reply soon to schedule a video call.</p>
    ${body.puppy ? `<p>You expressed interest in: <strong>${escHtml(body.puppy)}</strong></p>` : ''}
    <p>What happens next:</p>
    <ol>
      <li>We review your request and reach out to schedule a quick video call.</li>
      <li>On the call, you meet the puppy in real time and ask any questions.</li>
      <li>If it feels like the right fit, we move forward from there — no pressure.</li>
    </ol>
    <p>If you have urgent questions in the meantime, reply to this email or text us directly.</p>
    <p>Talk soon,<br />Sandy Carter<br />Carter French Bulls</p>
    <p style="color:#6E625A;font-size:13px;">This is an automated confirmation. We will follow up personally.</p>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New reservation request from ${body.name}${body.puppy ? ' — ' + body.puppy : ''}`,
        html: breederEmailHtml,
        replyTo: body.email,
      }),
      resend.emails.send({
        from: fromEmail,
        to: body.email,
        subject: 'We received your request — Carter French Bulls',
        html: visitorEmailHtml,
      }),
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function escHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
