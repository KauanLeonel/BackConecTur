// src/routes/adminRoutes.js
import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    partialUpdateEvent,
    deleteEvent,
    linkAdminToEvent 
} from '../controllers/adminController.js';

const router = express.Router();

// Rotas para gerenciamento de eventos por administradores
router.post('/', createEvent); // Rota para criar um evento
router.get('/', getAllEvents); // Rota para buscar todos os eventos
router.get('/:id', getEventById); // Rota para buscar um evento por ID
router.put('/:id', updateEvent); // Rota para atualização completa de um evento
router.patch('/:id', partialUpdateEvent); // Rota para atualização parcial de um evento
router.delete('/:id', deleteEvent); // Rota para deletar um evento


export default router;