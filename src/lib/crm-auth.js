const STORAGE_KEY = 'crm_user_session';

export const crm_auth = {
  setSession: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      userId: data.userId,
      name: data.name,
      role: data.role,
      loginTime: Date.now()
    }));
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