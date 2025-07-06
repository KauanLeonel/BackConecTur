// src/controllers/cupomController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function createCupom(req, res) {
    const lojaId = parseInt(req.params.lojaId); // ID da loja à qual o cupom será associado
    const { descricao, dataValidade } = req.body;

    // Validação básica
    if (isNaN(lojaId) || !descricao || !dataValidade) {
        return res.status(400).json({ message: 'ID da loja, descrição e data de validade do cupom são obrigatórios.' });
    }

    try {
        // Verifica se a loja existe
        const lojaExists = await prisma.loja.findUnique({
            where: { id: lojaId }
        });

        if (!lojaExists) {
            return res.status(404).json({ message: 'Loja não encontrada.' });
        }

        // Cria o cupom associado à loja
        const newCupom = await prisma.cupom.create({
            data: {
                descricao,
                dataValidade: new Date(dataValidade), // Converte a string para tipo Date
                loja: {
                    connect: { id: lojaId } // Associa o cupom à loja existente
                }
            }
        });
        res.status(201).json(newCupom);
    } catch (error) {
        console.error('Erro ao criar cupom:', error);
        res.status(500).json({ message: 'Erro ao criar cupom', error: error.message });
    }
}


export async function getAllCupons(req, res) {
    const lojaId = parseInt(req.query.lojaId) || parseInt(req.params.lojaId); // Pode vir da query string ou params

    try {
        const cupons = await prisma.cupom.findMany({
            where: lojaId ? { loja_id: lojaId } : undefined, // Filtra por loja se lojaId for fornecido
            include: {
                loja: { // Inclui os dados da loja associada
                    select: { id: true, nome: true } // Seleciona apenas o ID e nome da loja
                }
            }
        });
        res.json(cupons);
    } catch (error) {
        console.error('Erro ao buscar cupons:', error);
        res.status(500).json({ message: 'Erro ao buscar cupons', error: error.message });
    }
}


export async function getCupomById(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do cupom inválido.' });
    }

    try {
        const cupom = await prisma.cupom.findUnique({
            where: { id },
            include: {
                loja: {
                    select: { id: true, nome: true }
                }
            }
        });

        if (!cupom) {
            return res.status(404).json({ message: 'Cupom não encontrado.' });
        }
        res.json(cupom);
    } catch (error) {
        console.error('Erro ao buscar cupom por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar cupom', error: error.message });
    }
}


export async function updateCupom(req, res) {
    const id = parseInt(req.params.id);
    const { descricao, dataValidade, lojaId } = req.body; // lojaId opcional para reassociar

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do cupom inválido.' });
    }

    const dataToUpdate = {};
    if (descricao !== undefined) dataToUpdate.descricao = descricao;
    if (dataValidade !== undefined) dataToUpdate.dataValidade = new Date(dataValidade);

    // Se lojaId for fornecido, tenta reconectar o cupom a uma nova loja
    if (lojaId !== undefined) {
        if (isNaN(lojaId)) {
            return res.status(400).json({ message: 'ID da loja inválido para reassociar.' });
        }
        dataToUpdate.loja = { connect: { id: lojaId } };
    }

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado fornecido para atualização do cupom.' });
    }

    try {
        const updatedCupom = await prisma.cupom.update({
            where: { id },
            data: dataToUpdate,
            include: {
                loja: {
                    select: { id: true, nome: true }
                }
            }
        });
        res.json(updatedCupom);
    } catch (error) {
        console.error('Erro ao atualizar cupom:', error);
        if (error.code === 'P2025') { // Prisma error code for record not found
            return res.status(404).json({ message: 'Cupom não encontrado para atualização.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar cupom', error: error.message });
    }
}

export async function deleteCupom(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do cupom inválido.' });
    }

    try {
        await prisma.cupom.delete({
            where: { id }
        });
        res.json({ message: 'Cupom deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar cupom:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Cupom não encontrado para exclusão.' });
        }
        res.status(500).json({ message: 'Erro ao deletar cupom', error: error.message });
    }
}

/**
 * @desc (Opcional) Função para o cidadão resgatar um cupom.
 * Isso exigiria uma nova tabela no banco de dados (ex: CidadaoCupomResgatado)
 * para rastrear quais cupons foram resgatados por quais cidadãos.
 * @route POST /api/cidadaos/:cidadaoId/cupons/:cupomId/resgatar
 * @access Private (apenas o próprio cidadão autenticado)
 */
export async function resgatarCupom(req, res) {
    const cidadaoId = parseInt(req.params.cidadaoId);
    const cupomId = parseInt(req.params.cupomId);

    if (isNaN(cidadaoId) || isNaN(cupomId)) {
        return res.status(400).json({ message: 'IDs de cidadão ou cupom inválidos.' });
    }

    try {
        // 1. Verificar se o cupom existe e está válido (dataValidade)
        const cupom = await prisma.cupom.findUnique({ where: { id: cupomId } });
        if (!cupom) {
            return res.status(404).json({ message: 'Cupom não encontrado.' });
        }
        if (cupom.dataValidade < new Date()) {
            return res.status(400).json({ message: 'Cupom expirado.' });
        }

        // 2. Verificar se o cidadão já resgatou este cupom (necessita de tabela associativa)
        // Exemplo: const resgateExistente = await prisma.cidadaoCupomResgatado.findUnique({
        //     where: { cidadao_id_cupom_id: { cidadao_id: cidadaoId, cupom_id: cupomId } }
        // });
        // if (resgateExistente) {
        //     return res.status(409).json({ message: 'Cupom já resgatado por este cidadão.' });
        // }

        // 3. Registrar o resgate (necessita de tabela associativa)
        // Exemplo: const novoResgate = await prisma.cidadaoCupomResgatado.create({
        //     data: { cidadao_id: cidadaoId, cupom_id: cupomId, data_resgate: new Date() }
        // });

        // 4. (Opcional) Aplicar o efeito do cupom (ex: adicionar item ao inventário do cidadão, dar moedas, etc.)
        // Isso dependeria da lógica de negócio do cupom.

        res.json({ message: 'Cupom resgatado com sucesso!', cupom: cupom /*, resgate: novoResgate */ });

    } catch (error) {
        console.error('Erro ao resgatar cupom:', error);
        res.status(500).json({ message: 'Erro ao resgatar cupom', error: error.message });
    }
}


// Exporta as funções para serem usadas nas rotas
export default {
    createCupom,
    getAllCupons,
    getCupomById,
    updateCupom,
    deleteCupom,
    resgatarCupom // Opcional, se você implementar a lógica de resgate
};