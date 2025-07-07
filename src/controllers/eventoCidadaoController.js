import prisma from "../utils/prisma.js";

// Buscar todos os vínculos entre cidadãos e eventos
export async function getAllEventoCidadao(req, res) {
  try {
    const registros = await prisma.eventoCidadao.findMany();
    res.json(registros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar registros de evento-cidadão" });
  }
}

// Buscar vínculo específico por chave composta
export async function getEventoCidadao(req, res) {
  const { cidadaoId, eventoId } = req.params;

  try {
    const registro = await prisma.eventoCidadao.findUnique({
      where: {
        cidadaoId_eventoId: {
          cidadaoId: parseInt(cidadaoId),
          eventoId: parseInt(eventoId),
        },
      },
    });

    if (!registro) {
      return res.status(404).json({ message: "Vínculo não encontrado" });
    }

    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar vínculo" });
  }
}

// Criar um novo vínculo
export async function createEventoCidadao(req, res) {
  const { cidadaoId, eventoId, dataAssociacao } = req.body;

  try {
    const novo = await prisma.eventoCidadao.create({
      data: {
        cidadaoId: parseInt(cidadaoId),
        eventoId: parseInt(eventoId),
        dataAssociacao: dataAssociacao ? new Date(dataAssociacao) : undefined,
      },
    });
    res.status(201).json(novo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar vínculo" });
  }
}

// Atualizar o vínculo (data de associação)
export async function updateEventoCidadao(req, res) {
  const { cidadaoId, eventoId } = req.params;
  const { dataAssociacao } = req.body;

  try {
    const atualizado = await prisma.eventoCidadao.update({
      where: {
        cidadaoId_eventoId: {
          cidadaoId: parseInt(cidadaoId),
          eventoId: parseInt(eventoId),
        },
      },
      data: {
        dataAssociacao: dataAssociacao ? new Date(dataAssociacao) : undefined,
      },
    });

    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar vínculo" });
  }
}

// Deletar vínculo
export async function deleteEventoCidadao(req, res) {
  const { cidadaoId, eventoId } = req.params;

  try {
    await prisma.eventoCidadao.delete({
      where: {
        cidadaoId_eventoId: {
          cidadaoId: parseInt(cidadaoId),
          eventoId: parseInt(eventoId),
        },
      },
    });

    res.json({ message: "Vínculo deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar vínculo" });
  }
}

export async function getEventoCidadaoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const eventoCidadao = await prisma.eventoCidadao.findUnique({
      where: { 
        // adapte conforme sua PK, pode ser chave composta (exemplo abaixo)
        id: id // se tiver id único
        // se PK composta, use where: { cidadaoId_eventoId: { cidadaoId: X, eventoId: Y } }
      },
    });

    if (!eventoCidadao) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.json(eventoCidadao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar registro" });
  }
}


export default {
  getAllEventoCidadao,
  getEventoCidadao,
  createEventoCidadao,
  updateEventoCidadao,
  deleteEventoCidadao,
  getEventoCidadaoById,
};

