import express from 'express';
import * as missaoController from '../controllers/missaoController.js';

const router = express.Router();

router.get('/', missaoController.getAllMissoes);
router.get('/:id', missaoController.getMissaoById);
router.post('/', missaoController.createMissao);
router.put('/:id', missaoController.updateMissao);
router.patch('/:id', missaoController.partialUpdateMissao);
router.delete('/:id', missaoController.deleteMissao);

export default router;
