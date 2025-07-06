// src/routes/empresaRoutes.js
import express from 'express';
import {
    createEmpresa,
    getAllEmpresas,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa,
    linkEventToEmpresa,
    unlinkEventFromEmpresa
} from '../controllers/empresaController.js'; // Ajuste o caminho

const router = express.Router();

// Rotas para a entidade Empresa
router.post('/', createEmpresa); // Cria uma nova empresa (vinculando a um usuário existente)
router.get('/', getAllEmpresas); // Busca todas as empresas
router.get('/:usuarioId', getEmpresaById); // Busca uma empresa pelo ID do usuário
router.patch('/:usuarioId', updateEmpresa); // Atualiza dados da empresa
router.delete('/:usuarioId', deleteEmpresa); // Deleta uma empresa

// Rotas para gerenciamento de eventos por uma empresa
// A empresa vincula um evento existente a si
router.post('/:empresaUsuarioId/eventos/:eventoId/vincular', linkEventToEmpresa);
router.delete('/:empresaUsuarioId/eventos/:eventoId/desvincular', unlinkEventFromEmpresa);

export default router;