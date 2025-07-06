import express from 'express';
import * as lojaController from '../controllers/lojaController.js';

const router = express.Router();

router.get('/', lojaController.getAllLojas);
router.get('/:id', lojaController.getLojaById);
router.post('/', lojaController.createLoja);
router.put('/:id', lojaController.updateLoja);
router.patch('/:id', lojaController.partialUpdateLoja);
router.delete('/:id', lojaController.deleteLoja);

export default router;
