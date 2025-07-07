// controllers/eventoController.js
import prisma from "../utils/prisma.js";

// Buscar todos os eventos
export async function getAllEventos(req, res) {
  try {
    const eventos = await prisma.evento.findMany();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar eventos" });
  }
}

// Buscar evento por ID
export async function getEventoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const evento = await prisma.evento.findUnique({ where: { id } });
    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar evento" });
  }
}

// Criar novo evento
export async function createEvento(req, res) {
  const { nome, descricao, dataHora, categoria } = req.body;
  try {
    const novoEvento = await prisma.evento.create({
      data: {
        nome,
        descricao,
        dataHora: new Date(dataHora),
        categoria,
      },
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar evento" });
  }
}

// Atualizar completamente um evento (PUT)
export async function updateEvento(req, res) {
  const id = parseInt(req.params.id);
  const { nome, descricao, dataHora, categoria } = req.body;
  try {
    const eventoAtualizado = await prisma.evento.update({
      where: { id },
      data: {
        nome,
        descricao,
        dataHora: new Date(dataHora),
        categoria,
      },
    });
    res.json(eventoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar evento" });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdateEvento(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    if (data.dataHora) {
      data.dataHora = new Date(data.dataHora);
    }

    const eventoAtualizado = await prisma.evento.update({
      where: { id },
      data,
    });
    res.json(eventoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar parcialmente o evento" });
  }
}

// Deletar evento
export async function deleteEvento(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.evento.delete({ where: { id } });
    res.json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar evento" });
  }
}

export default {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  partialUpdateEvento,
  deleteEvento,
};
