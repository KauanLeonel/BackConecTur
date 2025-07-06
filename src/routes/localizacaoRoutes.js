import express from 'express';
import * as localizacaoController from '../controllers/localizacaoController.js';

const router = express.Router();

router.get('/', localizacaoController.getAllLocalizacoes);
router.get('/:id', localizacaoController.getLocalizacaoById);
router.post('/', localizacaoController.createLocalizacao);
router.put('/:id', localizacaoController.updateLocalizacao);
router.patch('/:id', localizacaoController.partialUpdateLocalizacao);
router.delete('/:id', localizacaoController.deleteLocalizacao);

export default router;
