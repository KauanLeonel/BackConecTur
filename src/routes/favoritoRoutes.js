import express from 'express';
import * as favoritoController from '../controllers/favoritoController.js';

const router = express.Router();

router.get('/', favoritoController.getAllFavoritos);
router.get('/:id', favoritoController.getFavoritoById);
router.post('/', favoritoController.createFavorito);
router.put('/:id', favoritoController.updateFavorito);
router.patch('/:id', favoritoController.partialUpdateFavorito);
router.delete('/:id', favoritoController.deleteFavorito);

export default router;
