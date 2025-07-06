import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEvent(req, res) {
    // Extrai os dados do corpo da requisição para criar o evento
    const { nome, descricao, dataHora, categoria, localizacao } = req.body;

    // Validação básica: garante que campos essenciais não estão vazios
    if (!nome || !dataHora || !localizacao) {
        return res.status(400).json({ message: 'Nome, data/hora e localização do evento são obrigatórios.' });
    }

    try {
        // Cria o evento e sua localização associada em uma única transação
        const newEvent = await prisma.eventos.create({
                      
            data: {
                nome,
                descricao,
                data_hora: new Date(dataHora), // Converte a string para tipo Date
                categoria,
                localizacao: { // Conecta a localização via composição (create nested write)
                    create: localizacao // localizacao deve ser um objeto { latitude, longitude, endereco }
                },
                // Se houver uma associação direta com o admin que criou/administrou, adicionar aqui
                // Ex: administrador: { connect: { usuario_id: req.user.id } }
                // Ou, se for para a tabela associativa evento_administrador:
                // evento_administrador: { create: { administrador: { connect: { usuario_id: req.user.id } } } }
                // Por simplicidade, não vou adicionar a FK direta do admin aqui, mas lembre-se da modelagem N:N.
            },
            include: {
                localizacao: true // Inclui a localização no retorno para confirmar
            }
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        // Pode-se detalhar o erro se for, por exemplo, um erro de validação do Prisma
        res.status(500).json({ message: 'Erro ao criar evento', error: error.message });
    }
}

export async function getAllEvents(req, res) {
    try {
        const events = await prisma.eventos.findMany({
            include: {
                localizacao: true // Inclui os dados de localização para cada evento
                // Incluir outras relações N:N se necessário para exibição completa
                // evento_cidadao: true,
                // evento_empresa: true,
                // evento_administrador: true
            }
        });
        res.json(events);
    } catch (error) {
        console.error('Erro ao buscar todos os eventos:', error);
        res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
    }
}

export async function getEventById(req, res) {
    const id = parseInt(req.params.id); // Converte o ID da URL para inteiro

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const event = await prisma.eventos.findUnique({
            where: { id },
            include: {
                localizacao: true // Inclui os dados de localização
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        res.json(event);
    } catch (error) {
        console.error('Erro ao buscar evento por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar evento', error: error.message });
    }
}

export async function updateEvent(req, res) {
    const id = parseInt(req.params.id);
    const { nome, descricao, dataHora, categoria, localizacao } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }
    if (!nome || !dataHora || !localizacao) {
        return res.status(400).json({ message: 'Nome, data/hora e localização do evento são obrigatórios para atualização completa.' });
    }

    try {
        // Atualiza o evento e sua localização associada
        const updatedEvent = await prisma.eventos.update({
            where: { id },
            data: {
                nome,
                descricao,
                data_hora: new Date(dataHora),
                categoria,
                localizacao: {
                    update: localizacao // Atualiza a localização relacionada
                }
            },
            include: {
                localizacao: true
            }
        });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Erro ao atualizar evento (PUT):', error);
        res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
}

export async function partialUpdateEvent(req, res) {
    const id = parseInt(req.params.id);
    const { localizacao, ...restOfData } = req.body; // Separa a localização do resto dos dados

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const dataToUpdate = { ...restOfData };

        if (dataToUpdate.dataHora) {
            dataToUpdate.data_hora = new Date(dataToUpdate.dataHora); // Converte a data
            delete dataToUpdate.dataHora; // Remove o campo original
        }

        const updatedEvent = await prisma.eventos.update({
            where: { id },
            data: {
                ...dataToUpdate,
                ...(localizacao && { localizacao: { update: localizacao } }) // Condicionalmente atualiza localização
            },
            include: {
                localizacao: true
            }
        });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Erro ao atualizar evento (PATCH):', error);
        res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
}


export async function deleteEvent(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        // A exclusão em cascata configurada no Prisma (e SQL) cuidará da localização
        await prisma.eventos.delete({
            where: { id }
        });
        res.json({ message: 'Evento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar evento:', error);
        // Se o erro for por evento não encontrado (P2025 no Prisma), você pode tratar:
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Evento não encontrado para exclusão.' });
        }
        res.status(500).json({ message: 'Erro ao deletar evento', error: error.message });
    }
}

export async function linkAdminToEvent(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    const adminId = parseInt(req.params.adminId); // ID do usuário que é um administrador

    if (isNaN(eventoId) || isNaN(adminId)) {
        return res.status(400).json({ message: 'IDs de evento ou administrador inválidos.' });
    }

    try {
        // Verifica se o evento e o administrador existem
        const eventExists = await prisma.eventos.findUnique({ where: { id: eventoId } });
        const adminExists = await prisma.administradores.findUnique({ where: { usuario_id: adminId } });

        if (!eventExists) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        if (!adminExists) {
            return res.status(404).json({ message: 'Administrador não encontrado.' });
        }

        const link = await prisma.eventoAdministrador.create({
            data: {
                evento_id: eventoId,
                administrador_id: adminId
            }
        });
        res.status(201).json({ message: 'Administrador vinculado ao evento com sucesso.', link });
    } catch (error) {
        console.error('Erro ao vincular administrador ao evento:', error);
        // P2002 é erro de chave única duplicada (tentando vincular o mesmo admin ao mesmo evento novamente)
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'Este administrador já está vinculado a este evento.' });
        }
        res.status(500).json({ message: 'Erro ao vincular administrador ao evento', error: error.message });
    }
}

export default {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    partialUpdateEvent,
    deleteEvent,
    linkAdminToEvent
};