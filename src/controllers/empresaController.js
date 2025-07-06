import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEmpresa(req, res) {
    const { usuarioId, cnpj } = req.body;

    if (isNaN(usuarioId) || !cnpj) {
        return res.status(400).json({ message: 'ID do usuário e CNPJ são obrigatórios.' });
    }

    try {
        // Verifica se o usuário existe e ainda não é uma empresa
        const usuarioExists = await prisma.usuario.findUnique({
            where: { id: usuarioId },
            include: { empresa: true } // Inclui a relação para verificar se já é empresa
        });

        if (!usuarioExists) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (usuarioExists.empresa) {
            return res.status(409).json({ message: 'Este usuário já está associado a uma empresa.' });
        }

        const newEmpresa = await prisma.empresa.create({
            data: {
                usuarioId,
                cnpj,
                // Conecta o usuário existente à empresa
                usuario: {
                    connect: { id: usuarioId }
                }
            }
        });
        res.status(201).json(newEmpresa);
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
        if (error.code === 'P2002' && error.meta?.target.includes('cnpj')) {
            return res.status(409).json({ message: 'CNPJ já cadastrado.' });
        }
        res.status(500).json({ message: 'Erro ao criar empresa', error: error.message });
    }
}

export async function getAllEmpresas(req, res) {
    try {
        const empresas = await prisma.empresa.findMany({
            include: {
                usuario: { // Inclui dados do usuário associado
                    select: { id: true, nome: true, email: true }
                },
                eventosCadastrados: { // Inclui os eventos que a empresa cadastrou
                    include: {
                        evento: true // Detalhes do evento
                    }
                }
            }
        });
        res.json(empresas);
    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        res.status(500).json({ message: 'Erro ao buscar empresas', error: error.message });
    }
}

export async function getEmpresaById(req, res) {
    const usuarioId = parseInt(req.params.usuarioId);

    if (isNaN(usuarioId)) {
        return res.status(400).json({ message: 'ID do usuário (empresa) inválido.' });
    }

    try {
        const empresa = await prisma.empresa.findUnique({
            where: { usuarioId },
            include: {
                usuario: {
                    select: { id: true, nome: true, email: true }
                },
                eventosCadastrados: {
                    include: {
                        evento: true
                    }
                }
            }
        });

        if (!empresa) {
            return res.status(404).json({ message: 'Empresa não encontrada.' });
        }
        res.json(empresa);
    } catch (error) {
        console.error('Erro ao buscar empresa por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar empresa', error: error.message });
    }
}

export async function updateEmpresa(req, res) {
    const usuarioId = parseInt(req.params.usuarioId);
    const { cnpj } = req.body; // Apenas CNPJ pode ser atualizado diretamente aqui

    if (isNaN(usuarioId)) {
        return res.status(400).json({ message: 'ID do usuário (empresa) inválido.' });
    }

    const dataToUpdate = {};
    if (cnpj !== undefined) dataToUpdate.cnpj = cnpj;

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'Nenhum dado fornecido para atualização da empresa.' });
    }

    try {
        const updatedEmpresa = await prisma.empresa.update({
            where: { usuarioId },
            data: dataToUpdate,
            include: {
                usuario: {
                    select: { id: true, nome: true, email: true }
                }
            }
        });
        res.json(updatedEmpresa);
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Empresa não encontrada para atualização.' });
        }
        if (error.code === 'P2002' && error.meta?.target.includes('cnpj')) {
            return res.status(409).json({ message: 'CNPJ já cadastrado.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar empresa', error: error.message });
    }
}

export async function deleteEmpresa(req, res) {
    const usuarioId = parseInt(req.params.usuarioId);

    if (isNaN(usuarioId)) {
        return res.status(400).json({ message: 'ID do usuário (empresa) inválido.' });
    }

    try {
        await prisma.empresa.delete({
            where: { usuarioId }
        });
        res.json({ message: 'Empresa e usuário associado deletados com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar empresa:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Empresa não encontrada para exclusão.' });
        }
        res.status(500).json({ message: 'Erro ao deletar empresa', error: error.message });
    }
}

export async function linkEventToEmpresa(req, res) {
    const empresaUsuarioId = parseInt(req.params.empresaUsuarioId); // ID do usuário que é a empresa
    const eventoId = parseInt(req.params.eventoId);

    if (isNaN(empresaUsuarioId) || isNaN(eventoId)) {
        return res.status(400).json({ message: 'IDs de empresa ou evento inválidos.' });
    }

    try {
        
        const empresaExists = await prisma.empresa.findUnique({ where: { usuarioId: empresaUsuarioId } });
        const eventExists = await prisma.evento.findUnique({ where: { id: eventoId } });

        if (!empresaExists) {
            return res.status(404).json({ message: 'Empresa não encontrada.' });
        }
        if (!eventExists) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }

        // Cria o registro na tabela associativa EventoEmpresa
        const link = await prisma.eventoEmpresa.create({
            data: {
                empresaId: empresaUsuarioId,
                eventoId: eventoId
            }
        });
        res.status(201).json({ message: 'Evento vinculado à empresa com sucesso.', link });
    } catch (error) {
        console.error('Erro ao vincular evento à empresa:', error);
        if (error.code === 'P2002') { // Erro de chave única duplicada
            return res.status(409).json({ message: 'Este evento já está vinculado a esta empresa.' });
        }
        res.status(500).json({ message: 'Erro ao vincular evento à empresa', error: error.message });
    }
}

export async function unlinkEventFromEmpresa(req, res) {
    const empresaUsuarioId = parseInt(req.params.empresaUsuarioId);
    const eventoId = parseInt(req.params.eventoId);

    if (isNaN(empresaUsuarioId) || isNaN(eventoId)) {
        return res.status(400).json({ message: 'IDs de empresa ou evento inválidos.' });
    }

    try {
        await prisma.eventoEmpresa.delete({
            where: {
                empresaId_eventoId: { // Chave composta para deleção
                    empresaId: empresaUsuarioId,
                    eventoId: eventoId
                }
            }
        });
        res.json({ message: 'Evento desvinculado da empresa com sucesso.' });
    } catch (error) {
        console.error('Erro ao desvincular evento da empresa:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Vínculo de evento com empresa não encontrado.' });
        }
        res.status(500).json({ message: 'Erro ao desvincular evento da empresa', error: error.message });
    }
}

export default {
    createEmpresa,
    getAllEmpresas,
    getEmpresaById,
    updateEmpresa,
    deleteEmpresa,
    linkEventToEmpresa,
    unlinkEventFromEmpresa
};