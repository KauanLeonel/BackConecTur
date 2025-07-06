import express from 'express';
import * as cupomController from '../controllers/cupomController.js';

const router = express.Router();

router.get('/', cupomController.getAllCupons);
router.get('/:id', cupomController.getCupomById);
router.post('/', cupomController.createCupom);
router.put('/:id', cupomController.updateCupom);
router.patch('/:id', cupomController.partialUpdateCupom);
router.delete('/:id', cupomController.deleteCupom);

export default router;
