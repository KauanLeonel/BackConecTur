import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getAllEventos(req, res) {
    try {
        const eventos = await prisma.evento.findMany({
            include: {
                localizacao: true, // Inclui os dados da localização
                empresas: { // Inclui empresas associadas (via EventoEmpresa)
                    include: { empresa: true }
                },
                administradores: { // Inclui administradores associados (via EventoAdministrador)
                    include: { administrador: true }
                },
                cidadaos: { // Inclui cidadãos associados (via EventoCidadao)
                    include: { cidadao: true }
                }
            }
        });
        res.json(eventos);
    } catch (error) {
        console.error('Erro ao buscar todos os eventos:', error); // Log do erro
        res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
    }
}

export async function getEventoById(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const evento = await prisma.evento.findUnique({
            where: { id },
            include: {
                localizacao: true, // Inclui os dados da localização
                empresas: {
                    include: { empresa: true }
                },
                administradores: {
                    include: { administrador: true }
                },
                cidadaos: {
                    include: { cidadao: true }
                }
            }
        });

        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        res.json(evento);
    } catch (error) {
        console.error('Erro ao buscar evento por ID:', error); // Log do erro
        res.status(500).json({ message: 'Erro ao buscar evento', error: error.message });
    }
}

export async function createEvento(req, res) {
    const { nome, descricao, data_hora, categoria, localizacao, administradorId } = req.body; // Recebe também a localização e o ID do admin (opcional)

    // Validação de campos obrigatórios
    if (!nome || !data_hora || !localizacao || !localizacao.endereco || !localizacao.latitude || !localizacao.longitude) {
        return res.status(400).json({ message: 'Nome, data/hora e todos os detalhes da localização (endereço, latitude, longitude) do evento são obrigatórios.' });
    }

    try {
        const newEvento = await prisma.evento.create({
            data: {
                nome,
                descricao,
                data_hora: new Date(data_hora), // Converte para tipo Date
                categoria,
                localizacao: { // Cria a localização aninhada
                    create: {
                        endereco: localizacao.endereco,
                        latitude: localizacao.latitude,
                        longitude: localizacao.longitude
                    }
                },
                // Opcional: Vincular o evento ao administrador que o criou via tabela associativa
                ...(administradorId && {
                    administradores: {
                        create: {
                            administrador: {
                                connect: { usuarioId: administradorId } // Conecta ao administrador existente
                            }
                        }
                    }
                })
            },
            include: {
                localizacao: true, // Inclui a localização no retorno
                administradores: true // Inclui o vínculo do administrador no retorno
            }
        });
        res.status(201).json(newEvento);
    } catch (error) {
        console.error('Erro ao criar evento:', error); // Log do erro
        res.status(500).json({ message: 'Erro ao criar evento', error: error.message });
    }
}

export async function updateEvento(req, res) {
    const id = parseInt(req.params.id);
    const { nome, descricao, data_hora, categoria, localizacao } = req.body; // Recebe também a localização

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }
    // Validação para PUT: todos os campos principais são esperados
    if (!nome || !data_hora || !localizacao || !localizacao.endereco || !localizacao.latitude || !localizacao.longitude) {
        return res.status(400).json({ message: 'Nome, data/hora e todos os detalhes da localização são obrigatórios para atualização completa.' });
    }

    try {
        const updatedEvento = await prisma.evento.update({
            where: { id },
            data: {
                nome,
                descricao,
                data_hora: new Date(data_hora),
                categoria,
                localizacao: { // Atualiza a localização aninhada
                    update: {
                        endereco: localizacao.endereco,
                        latitude: localizacao.latitude,
                        longitude: localizacao.longitude
                    }
                }
            },
            include: {
                localizacao: true
            }
        });
        res.json(updatedEvento);
    } catch (error) {
        console.error('Erro ao atualizar evento (PUT):', error); // Log do erro
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Evento não encontrado para atualização.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
}

export async function partialUpdateEvento(req, res) {
    const id = parseInt(req.params.id);
    const { localizacao, data_hora, ...restOfData } = req.body; // Separa localização e data_hora

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    const dataToUpdate = { ...restOfData };

    // Converte data_hora se presente
    if (data_hora !== undefined) {
        dataToUpdate.data_hora = new Date(data_hora);
    }

    try {
        const updatedEvento = await prisma.evento.update({
            where: { id },
            data: {
                ...dataToUpdate,
                ...(localizacao && { // Atualiza localização se for fornecida
                    localizacao: {
                        update: localizacao
                    }
                })
            },
            include: {
                localizacao: true
            }
        });
        res.json(updatedEvento);
    } catch (error) {
        console.error('Erro ao atualizar evento (PATCH):', error); // Log do erro
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Evento não encontrado para atualização parcial.' });
        }
        res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
}

export async function deleteEvento(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        await prisma.evento.delete({
            where: { id }
        });
        res.json({ message: 'Evento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar evento:', error); // Log do erro
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Evento não encontrado para exclusão.' });
        }
        res.status(500).json({ message: 'Erro ao deletar evento', error: error.message });
    }
}

export default {
    getAllEventos,
    getEventoById,
    createEvento,
    updateEvento,
    partialUpdateEvento,
    deleteEvento
};
