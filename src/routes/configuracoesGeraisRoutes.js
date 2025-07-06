// Exemplo em src/routes/cidadaoRoutes.js ou um novo arquivo de rotas
import express from 'express';
import {
    getGeneralConfigsByCidadaoId,
    updateGeneralConfigs
} from '../controllers/configuracoesGeraisController.js'; // Ajuste o caminho

const router = express.Router();

// Rotas para Configurações Gerais
router.get('/:cidadaoId/configuracoes-gerais', getGeneralConfigsByCidadaoId);
router.put('/:cidadaoId/configuracoes-gerais', updateGeneralConfigs); // Ou .patch

export default router;