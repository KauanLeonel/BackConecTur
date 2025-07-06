import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllEventos(req, res) {
  try {
    const eventos = await prisma.eventos.findMany();
    res.json(eventos);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar eventos.' });
  }
}

export async function getEventoById(req, res) {
  const { id } = req.params;
  try {
    const evento = await prisma.eventos.findUnique({ where: { id: Number(id) } });
    if (!evento) return res.status(404).json({ message: 'Evento não encontrado.' });
    res.json(evento);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar evento.' });
  }
}

export async function createEvento(req, res) {
  const { nome, descricao, data_hora, categoria } = req.body;
  try {
    const newEvento = await prisma.eventos.create({
      data: { nome, descricao, data_hora: new Date(data_hora), categoria }
    });
    res.status(201).json(newEvento);
  } catch {
    res.status(500).json({ message: 'Erro ao criar evento.' });
  }
}

export async function updateEvento(req, res) {
  const { id } = req.params;
  const { nome, descricao, data_hora, categoria } = req.body;
  try {
    const updatedEvento = await prisma.eventos.update({
      where: { id: Number(id) },
      data: { nome, descricao, data_hora: new Date(data_hora), categoria }
    });
    res.json(updatedEvento);
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar evento.' });
  }
}

export async function deleteEvento(req, res) {
  const { id } = req.params;
  try {
    await prisma.eventos.delete({ where: { id: Number(id) } });
    res.json({ message: 'Evento deletado com sucesso.' });
  } catch {
    res.status(500).json({ message: 'Erro ao deletar evento.' });
  }
}
