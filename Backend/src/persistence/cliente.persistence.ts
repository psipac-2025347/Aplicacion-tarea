import * as fs from 'fs';
import * as path from 'path';

export interface Cliente {
  codigoCliente: string;
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'Clientes.json');

function leerArchivo(): Cliente[] {
  const contenido = fs.readFileSync(DATA_FILE, 'utf-8');
  return contenido.trim() ? JSON.parse(contenido) : [];
}

function escribirArchivo(clientes: Cliente[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(clientes, null, 2), 'utf-8');
}

export function obtenerTodos(): Cliente[] {
  return leerArchivo();
}

export function obtenerPorCodigo(codigoCliente: string): Cliente | undefined {
  return leerArchivo().find(c => c.codigoCliente === codigoCliente);
}

export function crear(cliente: Cliente): Cliente {
  const clientes = leerArchivo();
  clientes.push(cliente);
  escribirArchivo(clientes);
  return cliente;
}

export function actualizar(codigoCliente: string, datos: Cliente): Cliente | undefined {
  const clientes = leerArchivo();
  const indice = clientes.findIndex(c => c.codigoCliente === codigoCliente);
  if (indice === -1) return undefined;
  clientes[indice] = datos;
  escribirArchivo(clientes);
  return clientes[indice];
}

export function eliminar(codigoCliente: string): boolean {
  const clientes = leerArchivo();
  const indice = clientes.findIndex(c => c.codigoCliente === codigoCliente);
  if (indice === -1) return false;
  clientes.splice(indice, 1);
  escribirArchivo(clientes);
  return true;
}