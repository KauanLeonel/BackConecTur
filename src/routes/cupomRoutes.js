import express from 'express';
import {
    createCupom,
    getAllCupons,
    getCupomById,
    updateCupom,
    deleteCupom,
    resgatarCupom // Se for usar
} from '../controllers/cupomController.js'; // Ajuste o caminho

const router = express.Router();

// Rotas de gerenciamento de Cupons (para administradores/gerenciadores de loja)
router.post('/lojas/:lojaId/cupons', createCupom); // Cria cupom para uma loja
router.get('/cupons', getAllCupons); // Busca todos os cupons
router.get('/lojas/:lojaId/cupons', getAllCupons); // Busca cupons de uma loja específica
router.get('/cupons/:id', getCupomById);
router.put('/cupons/:id', updateCupom);
router.delete('/cupons/:id', deleteCupom);

// Rota para o cidadão resgatar um cupom (se implementado)
router.post('/cidadaos/:cidadaoId/cupons/:cupomId/resgatar', resgatarCupom);

export default router;