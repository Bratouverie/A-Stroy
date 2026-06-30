const STORAGE_KEY = 'crm_user_session';

export const crm_auth = {
  loginWithCode: async (code) => {
    try {
      const response = await fetch('/api/crmCodeAuth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }
      
      const data = await response.json();

      if (data && data.success) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          userId: data.userId,
          name: data.name,
          role: data.role,
          loginTime: Date.now()
        }));
        return data;
      } else {
        throw new Error(data?.message || 'Неверный код');
      }
    } catch (error) {
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


};