import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const RATE_LIMIT_STORE = new Map();
const RATE_LIMIT_ATTEMPTS = 10;
const RATE_LIMIT_WINDOW = 60 * 1000;
const LOCKOUT_DURATION = 15 * 60 * 1000;

function getClientIp(req) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = RATE_LIMIT_STORE.get(ip) || { attempts: [], locked: null };

  if (entry.locked && now < entry.locked) {
    return { allowed: false, message: 'Доступ заблокирован. Попробуйте позже.' };
  }

  entry.attempts = entry.attempts.filter(t => now - t < RATE_LIMIT_WINDOW);

  if (entry.attempts.length >= RATE_LIMIT_ATTEMPTS) {
    entry.locked = now + LOCKOUT_DURATION;
    RATE_LIMIT_STORE.set(ip, entry);
    return { allowed: false, message: 'Слишком много попыток. Доступ заблокирован на 15 минут.' };
  }

  entry.attempts.push(now);
  RATE_LIMIT_STORE.set(ip, entry);
  return { allowed: true };
}

Deno.serve(async (req) => {
  try {
    const clientIp = getClientIp(req);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      console.warn(`[CRM Auth] Rate limit exceeded for IP: ${clientIp}`);
      return Response.json({ success: false, message: rateLimitCheck.message }, { status: 429 });
    }

    const body = await req.json();
    const code = (body.code || '').toUpperCase().trim();

    if (!code) {
      return Response.json({ success: false, message: 'Введите код' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    const users = await base44.asServiceRole.entities.CRMUser.filter({
      secretCode: code,
      isActive: true
    });

    if (users.length === 0) {
      console.warn(`[CRM Auth] Invalid code attempt from IP: ${clientIp}`);
      return Response.json({ success: false, message: 'Неверный код доступа' }, { status: 401 });
    }

    const user = users[0];
    console.log(`[CRM Auth] Successful login: ${user.name} (${user.role}) from IP: ${clientIp}`);
    
    return Response.json({
      success: true,
      userId: user.id,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    return Response.json({ success: false, message: 'Ошибка сервера: ' + error.message }, { status: 500 });
  }
});