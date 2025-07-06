import express from 'express';
import * as eventoCidadaoController from '../controllers/eventoCidadaoController.js';

const router = express.Router();

router.get('/', eventoCidadaoController.getAllEventosCidadao);
router.get('/:id', eventoCidadaoController.getEventoCidadaoById);
router.post('/', eventoCidadaoController.createEventoCidadao);
router.put('/:id', eventoCidadaoController.updateEventoCidadao);
router.patch('/:id', eventoCidadaoController.partialUpdateEventoCidadao);
router.delete('/:id', eventoCidadaoController.deleteEventoCidadao);

export default router;
