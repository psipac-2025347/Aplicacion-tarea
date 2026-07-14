import { Request, Response } from 'express';
import * as clientePersistence from '../persistence/cliente.persistence';

export function listar(req: Request, res: Response): void {
  const clientes = clientePersistence.obtenerTodos();
  res.json(clientes);
}

export function obtener(req: Request, res: Response): void {
  const cliente = clientePersistence.obtenerPorCodigo(req.params.codigoCliente);
  if (!cliente) {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
    return;
  }
  res.json(cliente);
}

export function crear(req: Request, res: Response): void {
  const { codigoCliente, nombreCliente, direccionCliente, telefono } = req.body;

  if (!codigoCliente || !nombreCliente || !direccionCliente || !telefono) {
    res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    return;
  }

  if (clientePersistence.obtenerPorCodigo(codigoCliente)) {
    res.status(409).json({ mensaje: 'Ya existe un cliente con ese código' });
    return;
  }

  const nuevoCliente = clientePersistence.crear({
    codigoCliente,
    nombreCliente,
    direccionCliente,
    telefono
  });
  res.status(201).json(nuevoCliente);
}

export function actualizar(req: Request, res: Response): void {
  const { nombreCliente, direccionCliente, telefono } = req.body;

  if (!nombreCliente || !direccionCliente || !telefono) {
    res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    return;
  }

  const clienteActualizado = clientePersistence.actualizar(req.params.codigoCliente, {
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

export function eliminar(req: Request, res: Response): void {
  const eliminado = clientePersistence.eliminar(req.params.codigoCliente);
  if (!eliminado) {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
    return;
  }
  res.status(204).send();
}