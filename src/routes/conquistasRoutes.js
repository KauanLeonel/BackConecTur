// Exemplo em src/routes/cidadaoRoutes.js (se as rotas de conquistas estiverem aninhadas)
import express from 'express';
import {
    getConquistasByCidadaoId,
    updateConquistas,
    updateMissionStatus,
    createMissionForConquistas
} from '../controllers/conquistasController.js'; // Ajuste o caminho

const router = express.Router();

// Rotas para Conquistas
router.get('/:cidadaoId/conquistas', getConquistasByCidadaoId);
router.put('/:cidadaoId/conquistas', updateConquistas); // Ou .patch

// Rotas para Missões (pode ser um endpoint separado ou aninhado)
router.patch('/missoes/:missaoId', updateMissionStatus); // Atualiza o status de uma missão
router.post('/:cidadaoId/conquistas/missoes', createMissionForConquistas); // Opcional: cria nova missão para o conjunto de conquistas

export default router;