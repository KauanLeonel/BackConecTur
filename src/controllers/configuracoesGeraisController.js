// src/controllers/configuracoesGeraisController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGeneralConfigsByCidadaoId(req, res) {
    const cidadaoId = parseInt(req.params.cidadaoId); // ID do cidadão

    // Validação básica do ID
    if (isNaN(cidadaoId)) {
        return res.status(400).json({ message: 'ID do cidadão inválido.' });
    }

    try {
        // Busca a configuração geral associada ao cidadão
        const configs = await prisma.configuracoesGerais.findUnique({
            where: {
                cidadao_id: cidadaoId // Busca pela chave estrangeira que também é a PK
            }
        });

        if (!configs) {
            // Se não encontrar, pode significar que o cidadão ainda não tem configurações
            return res.status(404).json({ message: 'Configurações gerais não encontradas para este cidadão.' });
        }

        res.json(configs);
    } catch (error) {
        console.error('Erro ao buscar configurações gerais:', error);
        res.status(500).json({ message: 'Erro ao buscar configurações gerais', error: error.message });
    }
}

export async function updateGeneralConfigs(req, res) {
    const cidadaoId = parseInt(req.params.cidadaoId); // ID do cidadão
    const { tema, idioma, receberEmail } = req.body; // Dados a serem atualizados

    // Validação básica do ID
    if (isNaN(cidadaoId)) {
        return res.status(400).json({ message: 'ID do cidadão inválido.' });
    }

    // Cria um objeto com os dados que foram enviados na requisição para atualização parcial
    const dataToUpdate = {};
    if (tema !== undefined) dataToUpdate.tema = tema;
    if (idioma !== undefined) dataToUpdate.idioma = idioma;
    if (receberEmail !== undefined) dataToUpdate.receberEmail = receberEmail;

    // Se nenhum dado foi fornecido para atualização
    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
    }

    try {
        // Usa upsert: tenta atualizar, se não existir, cria.
        // Isso é útil para relações 1:1 onde a entrada pode não existir inicialmente.
        const updatedConfigs = await prisma.configuracoesGerais.upsert({
            where: {
                cidadao_id: cidadaoId // Condição para encontrar o registro existente
            },
            update: dataToUpdate, // Dados para atualizar se o registro existir
            create: { // Dados para criar se o registro não existir
                cidadao_id: cidadaoId,
                ...dataToUpdate,
                // Forneça valores padrão para campos não incluídos na atualização, se necessário
                tema: dataToUpdate.tema || 'claro', // Exemplo de valor padrão
                idioma: dataToUpdate.idioma || 'pt-BR',
                receberEmail: dataToUpdate.receberEmail !== undefined ? dataToUpdate.receberEmail : true
            }
        });

        res.json(updatedConfigs);
    } catch (error) {
        console.error('Erro ao atualizar configurações gerais:', error);
        res.status(500).json({ message: 'Erro ao atualizar configurações gerais', error: error.message });
    }
}

// Exporta as funções para serem usadas nas rotas
export default {
    getGeneralConfigsByCidadaoId,
    updateGeneralConfigs
};