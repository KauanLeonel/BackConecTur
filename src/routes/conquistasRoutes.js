import express from 'express';
import * as conquistasController from '../controllers/conquistasController.js';

const router = express.Router();

router.get('/', conquistasController.getAllConquistas);
router.get('/:id', conquistasController.getConquistaById);
router.post('/', conquistasController.createConquista);
router.put('/:id', conquistasController.updateConquista);
router.patch('/:id', conquistasController.partialUpdateConquista);
router.delete('/:id', conquistasController.deleteConquista);

export default router;
