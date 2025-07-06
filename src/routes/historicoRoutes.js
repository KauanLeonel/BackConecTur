import express from 'express';
import * as historicoController from '../controllers/historicoController.js';

const router = express.Router();

router.get('/', historicoController.getAllHistoricos);
router.get('/:id', historicoController.getHistoricoById);
router.post('/', historicoController.createHistorico);
router.put('/:id', historicoController.updateHistorico);
router.patch('/:id', historicoController.partialUpdateHistorico);
router.delete('/:id', historicoController.deleteHistorico);

export default router;
