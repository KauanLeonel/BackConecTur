import express from 'express';
import * as configuracoesGeraisController from '../controllers/configuracoesGeraisController.js';

const router = express.Router();

router.get('/', configuracoesGeraisController.getAllConfiguracoes);
router.get('/:id', configuracoesGeraisController.getConfiguracaoById);
router.post('/', configuracoesGeraisController.createConfiguracao);
router.put('/:id', configuracoesGeraisController.updateConfiguracao);
router.patch('/:id', configuracoesGeraisController.partialUpdateConfiguracao);
router.delete('/:id', configuracoesGeraisController.deleteConfiguracao);

export default router;
