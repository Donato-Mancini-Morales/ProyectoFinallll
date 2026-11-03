import React, { createContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('perfumeria_user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('perfumeria_token') || null);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data.usuario);
      setToken(res.data.token);
      localStorage.setItem('perfumeria_user', JSON.stringify(res.data.usuario));
      localStorage.setItem('perfumeria_token', res.data.token);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.mensaje || 'Error al iniciar sesión' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('perfumeria_user');
    localStorage.removeItem('perfumeria_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.rol === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}