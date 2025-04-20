import axios from './root.service'; // Asumiendo que el archivo root.service ya está en TypeScript
import { formatUserData } from '@helpers/formatData'; // Asegúrate de que este módulo también esté tipado

// Tipos personalizados para las respuestas de la API
interface User {
  // Define aquí las propiedades del usuario según tu estructura de datos
  id: number;
  name: string;
  email: string;
  // Agrega más campos según sea necesario
}

interface ApiResponse<T> {
  data: T;
}

// Función para obtener usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get<ApiResponse<{ data: User[] }>>('/user/');
    const formattedData = response.data.data.map(formatUserData);
    return formattedData;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
}

// Función para actualizar un usuario
export async function updateUser(data: object, rut: string): Promise<User> {
  try {
    const response = await axios.patch<ApiResponse<User>>(`/user/detail/?rut=${rut}`, data);
    console.log(response);
    return response.data.data;
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
}

// Función para eliminar un usuario
export async function deleteUser(rut: string): Promise<void> {
  try {
    const response = await axios.delete<ApiResponse<void>>(`/user/detail/?rut=${rut}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
}