import express from 'express';
import * as sorteioController from '../controllers/sorteioController.js';

const router = express.Router();

router.get('/', sorteioController.getAllSorteios);
router.get('/:id', sorteioController.getSorteioById);
router.post('/', sorteioController.createSorteio);
router.put('/:id', sorteioController.updateSorteio);
router.patch('/:id', sorteioController.partialUpdateSorteio);
router.delete('/:id', sorteioController.deleteSorteio);

export default router;
