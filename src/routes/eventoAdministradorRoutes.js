import express from 'express';
import * as eventoAdminController from '../controllers/eventoAdministradorController.js';

const router = express.Router();

router.get('/', eventoAdminController.getAllEventosAdmin);
router.get('/:id', eventoAdminController.getEventoAdminById);
router.post('/', eventoAdminController.createEventoAdmin);
router.put('/:id', eventoAdminController.updateEventoAdmin);
router.patch('/:id', eventoAdminController.partialUpdateEventoAdmin);
router.delete('/:id', eventoAdminController.deleteEventoAdmin);

export default router;
