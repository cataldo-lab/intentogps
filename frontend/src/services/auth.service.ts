import axios from './root.service'; // Asumiendo que el archivo root.service ya está en TypeScript
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { convertirMinusculas } from '@helpers/formatData'; // Asegúrate de que este módulo también esté tipado

// Tipos personalizados para los datos de usuario
interface UserData {
  rut: string;
  password: string;
}

interface DecodedToken {
  nombre: string;
  apellido: string;
  email: string;
  rut: string;
  rol: string;
}

interface ApiResponse<T> {
  data: T;
}

interface LoginResponse {
  token: string;
}

// Función para iniciar sesión
export async function login(dataUser: UserData): Promise<any> {
  try {
    const response = await axios.post<ApiResponse<LoginResponse>>("/auth/login", {
      rut: dataUser.rut,
      password: dataUser.password,
    });

    const { status, data } = response;
    if (status === 200) {
      const decodedToken = jwtDecode<DecodedToken>(data.data.token);
      const userData = {
        nombre: decodedToken.nombre,
        apellido: decodedToken.apellido,
        email: decodedToken.email,
        rut: decodedToken.rut,
        rol: decodedToken.rol,
      };

      sessionStorage.setItem('usuario', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      Cookies.set('jwt-auth', data.data.token, { path: '/' });

      return response.data;
    }
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
}

// Función para registrar un usuario
export async function register(data: Record<string, string>): Promise<any> {
  try {
    const dataRegister = convertirMinusculas(data);
    const { nombre, apellido, email, rut, rol, password } = dataRegister;

    const response = await axios.post<ApiResponse<any>>("/auth/register", {
      nombre,
      apellido,
      email,
      rut,
      rol,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
}

// Función para cerrar sesión
export async function logout(): Promise<void> {
  try {
    await axios.post("/auth/logout");
    sessionStorage.removeItem('usuario');
    Cookies.remove('jwt');
    Cookies.remove('jwt-auth');
  } catch (error: any) {
    console.error('Error al cerrar sesión:', error);
    throw new Error(error.response?.data?.message || 'Failed to logout');
  }
}