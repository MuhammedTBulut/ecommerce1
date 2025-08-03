const authUrl = 'http://localhost:5000/api/auth';

export const authProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${authUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const { token, user } = await response.json();
      
      // Check if user is admin
      if (user.role !== 'Admin') {
        throw new Error('Access denied. Admin privileges required.');
      }
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve();
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const userData = JSON.parse(user);
      if (userData.role === 'Admin') {
        return Promise.resolve();
      }
    }
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return Promise.reject();
  },

  getPermissions: () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return Promise.resolve(userData.role);
    }
    return Promise.reject();
  },

  getIdentity: () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return Promise.resolve({
        id: userData.id,
        fullName: userData.fullName,
        avatar: userData.avatar,
      });
    }
    return Promise.reject();
  },
};