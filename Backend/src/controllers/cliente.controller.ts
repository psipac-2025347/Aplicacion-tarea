import { Request, Response } from 'express';
import * as clientePersistence from '../persistence/cliente.persistence';

export async function listar(req: Request, res: Response): Promise<void> {
  const clientes = await clientePersistence.obtenerTodos();
  res.json(clientes);
}

export async function obtener(req: Request, res: Response): Promise<void> {
  const cliente = await clientePersistence.obtenerPorCodigo(req.params.codigoCliente);
  if (!cliente) {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
    return;
  }
  res.json(cliente);
}

export async function crear(req: Request, res: Response): Promise<void> {
  const { codigoCliente, nombreCliente, direccionCliente, telefono } = req.body;

  if (!codigoCliente || !nombreCliente || !direccionCliente || !telefono) {
    res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    return;
  }

  const existente = await clientePersistence.obtenerPorCodigo(codigoCliente);
  if (existente) {
    res.status(409).json({ mensaje: 'Ya existe un cliente con ese código' });
    return;
  }

  const nuevoCliente = await clientePersistence.crear({
    codigoCliente,
    nombreCliente,
    direccionCliente,
    telefono
  });
  res.status(201).json(nuevoCliente);
}

export async function actualizar(req: Request, res: Response): Promise<void> {
  const { nombreCliente, direccionCliente, telefono } = req.body;

  if (!nombreCliente || !direccionCliente || !telefono) {
    res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    return;
  }

  const clienteActualizado = await clientePersistence.actualizar(req.params.codigoCliente, {
    codigoCliente: req.params.codigoCliente,
    nombreCliente,
    direccionCliente,
    telefono
  });

  if (!clienteActualizado) {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
    return;
  }

  res.json(clienteActualizado);
}

export async function eliminar(req: Request, res: Response): Promise<void> {
  const eliminado = await clientePersistence.eliminar(req.params.codigoCliente);
  if (!eliminado) {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
    return;
  }
  res.status(204).send();
}