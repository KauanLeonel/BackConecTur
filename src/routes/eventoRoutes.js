import express from 'express';
import * as eventoController from '../controllers/eventoController.js';

const router = express.Router();

router.get('/', eventoController.getAllEventos);
router.get('/:id', eventoController.getEventoById);
router.post('/', eventoController.createEvento);
router.put('/:id', eventoController.updateEvento);
router.patch('/:id', eventoController.partialUpdateEvento);
router.delete('/:id', eventoController.deleteEvento);

export default router;
