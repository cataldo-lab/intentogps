import { startCase } from "lodash";
import { format as formatRut } from "rut.js";
import { format as formatTempo } from "@formkit/tempo";

// Puedes definir una interfaz para los datos del usuario
interface User {
  nombre: string;
  apellido: string;
  rol: string;
  rut: string;
  email?: string;
  createdAt: string | Date;
  [key: string]: any; // permite propiedades adicionales dinámicas
}

export function formatUserData(user: User): User {
  return {
    ...user,
    nombre: startCase(user.nombre),
    apellido: startCase(user.apellido),
    rol: startCase(user.rol),
    rut: formatRut(user.rut),
    createdAt: formatTempo(user.createdAt, "DD-MM-YYYY"),
  };
}

export function convertirMinusculas(obj: Record<string, any>): Record<string, any> {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].toLowerCase();
    }
  }
  return obj;
}

export function formatPostUpdate(user: User): Partial<User> {
  return {
    nombre: startCase(user.nombre),
    apellido: startCase(user.apellido),
    rol: startCase(user.rol),
    rut: formatRut(user.rut),
    email: user.email,
    createdAt: formatTempo(user.createdAt, "DD-MM-YYYY"),
  };
}
