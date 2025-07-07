// controllers/localizacaoController.js
import prisma from "../utils/prisma.js";

// Buscar todas as localizações
export async function getAllLocalizacoes(req, res) {
  try {
    const localizacoes = await prisma.localizacao.findMany();
    res.json(localizacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar localizações" });
  }
}

// Buscar localização por ID
export async function getLocalizacaoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const localizacao = await prisma.localizacao.findUnique({ where: { id } });
    if (!localizacao) {
      return res.status(404).json({ message: "Localização não encontrada" });
    }
    res.json(localizacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar localização" });
  }
}

// Criar nova localização
export async function createLocalizacao(req, res) {
  const { latitude, longitude, endereco, eventoId } = req.body;
  try {
    const nova = await prisma.localizacao.create({
      data: { latitude, longitude, endereco, eventoId }
    });
    res.status(201).json(nova);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar localização" });
  }
}

// Atualização total (PUT)
export async function updateLocalizacao(req, res) {
  const id = parseInt(req.params.id);
  const { latitude, longitude, endereco, eventoId } = req.body;
  try {
    const atualizada = await prisma.localizacao.update({
      where: { id },
      data: { latitude, longitude, endereco, eventoId }
    });
    res.json(atualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar localização" });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdateLocalizacao(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const atualizada = await prisma.localizacao.update({
      where: { id },
      data
    });
    res.json(atualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar localização parcialmente" });
  }
}

// Deletar localização
export async function deleteLocalizacao(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.localizacao.delete({ where: { id } });
    res.json({ message: "Localização deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar localização" });
  }
}

export default {
  getAllLocalizacoes,
  getLocalizacaoById,
  createLocalizacao,
  updateLocalizacao,
  partialUpdateLocalizacao,
  deleteLocalizacao
};
    