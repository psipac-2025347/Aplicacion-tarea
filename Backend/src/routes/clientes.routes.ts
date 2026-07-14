import { Router } from 'express';
import * as clienteController from '../controllers/cliente.controller';
const router = Router();

router.get('/', clienteController.listar);
router.get('/:codigoCliente', clienteController.obtener);
router.post('/', clienteController.crear);
router.put('/:codigoCliente', clienteController.actualizar);
router.delete('/:codigoCliente', clienteController.eliminar);

export default router;