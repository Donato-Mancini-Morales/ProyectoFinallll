import axios from 'axios';

// 1. Primero se declara y define la instancia
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// 2. Luego se usan los interceptores sobre esa constante ya creada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('perfumeria_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Finalmente se exporta por defecto
export default api;