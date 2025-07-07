import express from "express";

import { getAllEventoCidadao, getEventoCidadaoById, createEventoCidadao, updateEventoCidadao, deleteEventoCidadao } from '../controllers/eventoCidadaoController.js';

const router = express.Router();

router.get('/', getAllEventoCidadao); // PASSA a função handler correta
router.get('/:id', getEventoCidadaoById);
router.post('/', createEventoCidadao);
router.put('/:id', updateEventoCidadao);
router.delete('/:id', deleteEventoCidadao);

export default router;
