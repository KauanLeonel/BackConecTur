import express from 'express';
import * as preferenciasNotificacaoController from '../controllers/preferenciasNotificacaoController.js';

const router = express.Router();

router.get('/', preferenciasNotificacaoController.getAllPreferencias);
router.get('/:id', preferenciasNotificacaoController.getPreferenciaById);
router.post('/', preferenciasNotificacaoController.createPreferencia);
router.put('/:id', preferenciasNotificacaoController.updatePreferencia);
router.patch('/:id', preferenciasNotificacaoController.partialUpdatePreferencia);
router.delete('/:id', preferenciasNotificacaoController.deletePreferencia);

export default router;
