import express from 'express';
import * as empresaController from '../controllers/empresaController.js';

const router = express.Router();

router.get('/', empresaController.getAllEmpresas);
router.get('/:id', empresaController.getEmpresaById);
router.post('/', empresaController.createEmpresa);
router.put('/:id', empresaController.updateEmpresa);
router.patch('/:id', empresaController.partialUpdateEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

export default router;
