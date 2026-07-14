import { pool } from './db';

export interface Cliente {
  codigoCliente: string;
  nombreCliente: string;
  direccionCliente: string;
  telefono: string;
}

function mapFila(fila: any): Cliente {
  return {
    codigoCliente: fila.codigo_cliente,
    nombreCliente: fila.nombre_cliente,
    direccionCliente: fila.direccion_cliente,
    telefono: fila.telefono
  };
}

export async function obtenerTodos(): Promise<Cliente[]> {
  const resultado = await pool.query('SELECT * FROM clientes ORDER BY codigo_cliente');
  return resultado.rows.map(mapFila);
}

export async function obtenerPorCodigo(codigoCliente: string): Promise<Cliente | undefined> {
  const resultado = await pool.query(
    'SELECT * FROM clientes WHERE codigo_cliente = $1',
    [codigoCliente]
  );
  return resultado.rows[0] ? mapFila(resultado.rows[0]) : undefined;
}

export async function crear(cliente: Cliente): Promise<Cliente> {
  const resultado = await pool.query(
    `INSERT INTO clientes (codigo_cliente, nombre_cliente, direccion_cliente, telefono)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [cliente.codigoCliente, cliente.nombreCliente, cliente.direccionCliente, cliente.telefono]
  );
  return mapFila(resultado.rows[0]);
}

export async function actualizar(codigoCliente: string, datos: Cliente): Promise<Cliente | undefined> {
  const resultado = await pool.query(
    `UPDATE clientes
     SET nombre_cliente = $1, direccion_cliente = $2, telefono = $3
     WHERE codigo_cliente = $4 RETURNING *`,
    [datos.nombreCliente, datos.direccionCliente, datos.telefono, codigoCliente]
  );
  return resultado.rows[0] ? mapFila(resultado.rows[0]) : undefined;
}

export async function eliminar(codigoCliente: string): Promise<boolean> {
  const resultado = await pool.query(
    'DELETE FROM clientes WHERE codigo_cliente = $1',
    [codigoCliente]
  );
  return (resultado.rowCount ?? 0) > 0;
}