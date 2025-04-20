import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// Definimos el tipo para las variables de entorno
interface ImportMetaEnv {
  VITE_BASE_URL?: string;
}

// Obtenemos la URL base desde las variables de entorno o usamos una por defecto
const API_URL: string = (import.meta.env as ImportMetaEnv).VITE_BASE_URL || 'http://localhost:3000/api';

// Creamos una instancia de Axios con tipos explícitos
const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor de solicitud
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token: string | undefined = Cookies.get('jwt-auth', { path: '/' });
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: any): Promise<never> => Promise.reject(error)
);

export default instance;