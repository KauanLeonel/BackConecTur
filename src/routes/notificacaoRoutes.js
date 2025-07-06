import express from 'express';
import * as notificacaoController from '../controllers/notificacaoController.js';

const router = express.Router();

router.get('/', notificacaoController.getAllNotificacoes);
router.get('/:id', notificacaoController.getNotificacaoById);
router.post('/', notificacaoController.createNotificacao);
router.put('/:id', notificacaoController.updateNotificacao);
router.patch('/:id', notificacaoController.partialUpdateNotificacao);
router.delete('/:id', notificacaoController.deleteNotificacao);

export default router;
