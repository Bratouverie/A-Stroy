const STORAGE_KEY = 'crm_user_session';
const STORAGE_ATTEMPTS = 'crm_code_attempts';
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 15 * 60 * 1000;
const ATTEMPT_DELAY = 500;

export const crm_auth = {
  loginWithCode: async (code) => {
    const attempts = JSON.parse(localStorage.getItem(STORAGE_ATTEMPTS) || '{"count":0,"lockedUntil":null,"lastAttempt":0}');

    if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
      const mins = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
      throw new Error(`Слишком много попыток. Попробуйте через ${mins} мин.`);
    }

    const timeSinceLastAttempt = Date.now() - (attempts.lastAttempt || 0);
    if (timeSinceLastAttempt < ATTEMPT_DELAY) {
      await new Promise(resolve => setTimeout(resolve, ATTEMPT_DELAY - timeSinceLastAttempt));
    }

    try {
      const response = await fetch('/api/crmCodeAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const data = await response.json();

      if (data && data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          userId: data.userId,
          name: data.name,
          role: data.role,
          loginTime: Date.now()
        }));
        localStorage.removeItem(STORAGE_ATTEMPTS);
        return data;
      } else if (data && data.message) {
        throw new Error(data.message);
      } else {
        throw new Error('Ошибка: неверный формат ответа сервера');
      }
    } catch (error) {
      attempts.count++;
      attempts.lastAttempt = Date.now();
      if (attempts.count >= MAX_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + LOCKOUT_TIME;
        attempts.count = 0;
      }
      localStorage.setItem(STORAGE_ATTEMPTS, JSON.stringify(attempts));
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: () => {
    try {
      const session = localStorage.getItem(STORAGE_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!crm_auth.getCurrentUser();
  },

  getUserRole: () => {
    return crm_auth.getCurrentUser()?.role || null;
  },

  getRemainingAttempts: () => {
    const attempts = JSON.parse(localStorage.getItem(STORAGE_ATTEMPTS) || '{"count":0}');
    return MAX_ATTEMPTS - attempts.count;
  }
};