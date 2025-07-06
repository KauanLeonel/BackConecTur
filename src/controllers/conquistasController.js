// src/controllers/conquistasController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getConquistasByCidadaoId(req, res) {
    const cidadaoId = parseInt(req.params.cidadaoId); // ID do cidadão

    if (isNaN(cidadaoId)) {
        return res.status(400).json({ message: 'ID do cidadão inválido.' });
    }

    try {
        // Busca o registro de conquistas associado ao cidadão
        const conquistas = await prisma.conquistas.findUnique({
            where: {
                cidadao_id: cidadaoId // Busca pela chave estrangeira que também é a PK
            },
            include: {
                missoes: true // Inclui todas as missões associadas a este conjunto de conquistas
            }
        });

        if (!conquistas) {
            return res.status(404).json({ message: 'Conquistas não encontradas para este cidadão.' });
        }

        res.json(conquistas);
    } catch (error) {
        console.error('Erro ao buscar conquistas:', error);
        res.status(500).json({ message: 'Erro ao buscar conquistas', error: error.message });
    }
}


export async function updateConquistas(req, res) {
    const cidadaoId = parseInt(req.params.cidadaoId); // ID do cidadão
    const { moedas, nivel, progresso } = req.body; // Dados a serem atualizados

    if (isNaN(cidadaoId)) {
        return res.status(400).json({ message: 'ID do cidadão inválido.' });
    }

    const dataToUpdate = {};
    if (moedas !== undefined) dataToUpdate.moedas = moedas;
    if (nivel !== undefined) dataToUpdate.nivel = nivel;
    if (progresso !== undefined) dataToUpdate.progresso = progresso;

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado fornecido para atualização das conquistas.' });
    }

    try {
        // Usa upsert: tenta atualizar, se não existir, cria.
        const updatedConquistas = await prisma.conquistas.upsert({
            where: {
                cidadao_id: cidadaoId
            },
            update: dataToUpdate,
            create: {
                cidadao_id: cidadaoId,
                ...dataToUpdate,
                // Forneça valores padrão para campos que podem não estar no 'dataToUpdate' inicial
                moedas: dataToUpdate.moedas || 0,
                nivel: dataToUpdate.nivel || 1,
                progresso: dataToUpdate.progresso || 0.0
            }
        });

        res.json(updatedConquistas);
    } catch (error) {
        console.error('Erro ao atualizar conquistas:', error);
        res.status(500).json({ message: 'Erro ao atualizar conquistas', error: error.message });
    }
}


export async function updateMissionStatus(req, res) {
    const missaoId = parseInt(req.params.missaoId);
    const { concluido } = req.body; // Espera-se um booleano

    if (isNaN(missaoId)) {
        return res.status(400).json({ message: 'ID da missão inválido.' });
    }
    // Verifica se 'concluido' é um booleano explícito
    if (typeof concluido !== 'boolean') {
        return res.status(400).json({ message: 'O status "concluido" deve ser um valor booleano (true/false).' });
    }

    try {
        const updatedMission = await prisma.missao.update({
            where: { id: missaoId },
            data: { concluido }
        });

        res.json(updatedMission);
    } catch (error) {
        console.error('Erro ao atualizar status da missão:', error);
        if (error.code === 'P2025') { // Prisma error code for record not found
            return res.status(404).json({ message: 'Missão não encontrada.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar status da missão', error: error.message });
    }
}


export async function createMissionForConquistas(req, res) {
    const cidadaoId = parseInt(req.params.cidadaoId);
    const { descricao, premio } = req.body;

    if (isNaN(cidadaoId) || !descricao || !premio) {
        return res.status(400).json({ message: 'ID do cidadão, descrição e prêmio da missão são obrigatórios.' });
    }

    try {
        // Primeiro, encontre o ID do conjunto de conquistas do cidadão
        const conquistas = await prisma.conquistas.findUnique({
            where: { cidadao_id: cidadaoId }
        });

        if (!conquistas) {
            return res.status(404).json({ message: 'Conjunto de conquistas não encontrado para este cidadão.' });
        }

        const newMission = await prisma.missao.create({
            data: {
                descricao,
                premio,
                conquistas_id: conquistas.id, // Associa a missão ao conjunto de conquistas
                concluido: false // Nova missão começa como não concluída
            }
        });
        res.status(201).json(newMission);
    } catch (error) {
        console.error('Erro ao criar missão para conquistas:', error);
        res.status(500).json({ message: 'Erro ao criar missão', error: error.message });
    }
}


// Exporta as funções para serem usadas nas rotas
export default {
    getConquistasByCidadaoId,
    updateConquistas,
    updateMissionStatus,
    createMissionForConquistas // Opcional, dependendo da sua lógica de negócio
};
