const STORAGE_KEY = 'crm_user_session';

export const crm_auth = {
  loginWithCode: async (code) => {
    if (!code || !code.trim()) {
      throw new Error('Код не может быть пустым');
    }

    try {
      const response = await fetch('/api/crmCodeAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Ошибка авторизации');
      }

      if (data?.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          userId: data.userId,
          name: data.name,
          role: data.role,
          loginTime: Date.now()
        }));
        return { success: true, data };
      } else {
        throw new Error(data?.message || 'Доступ запрещён');
      }
    } catch (error) {
      throw new Error(error.message || 'Ошибка подключения к серверу');
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
  }
};