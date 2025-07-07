// controllers/historicoController.js
import prisma from "../utils/prisma.js";

// Buscar todos os históricos
export async function getAllHistoricos(req, res) {
  try {
    const historicos = await prisma.historico.findMany();
    res.json(historicos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar históricos" });
  }
}

// Buscar um histórico por ID
export async function getHistoricoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const historico = await prisma.historico.findUnique({ where: { id } });
    if (!historico) {
      return res.status(404).json({ message: "Histórico não encontrado" });
    }
    res.json(historico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar histórico" });
  }
}

// Criar um novo histórico
export async function createHistorico(req, res) {
  const { cidadaoId, eventoId, dataAcesso } = req.body;
  try {
    const novo = await prisma.historico.create({
      data: {
        cidadaoId,
        eventoId,
        dataAcesso: dataAcesso ? new Date(dataAcesso) : undefined,
      },
    });
    res.status(201).json(novo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar histórico" });
  }
}

// Atualização total (PUT)
export async function updateHistorico(req, res) {
  const id = parseInt(req.params.id);
  const { cidadaoId, eventoId, dataAcesso } = req.body;
  try {
    const atualizado = await prisma.historico.update({
      where: { id },
      data: {
        cidadaoId,
        eventoId,
        dataAcesso: dataAcesso ? new Date(dataAcesso) : undefined,
      },
    });
    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar histórico" });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdateHistorico(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    if (data.dataAcesso) {
      data.dataAcesso = new Date(data.dataAcesso);
    }
    const atualizado = await prisma.historico.update({
      where: { id },
      data,
    });
    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar histórico parcialmente" });
  }
}

// Deletar histórico
export async function deleteHistorico(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.historico.delete({ where: { id } });
    res.json({ message: "Histórico deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar histórico" });
  }
}

export default {
  getAllHistoricos,
  getHistoricoById,
  createHistorico,
  updateHistorico,
  partialUpdateHistorico,
  deleteHistorico,
};
