import prisma from "../utils/prisma.js";

// 🔍 Buscar todas as missões
export async function getAllMissoes(req, res) {
  try {
    const missoes = await prisma.missao.findMany();
    res.json(missoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar missões" });
  }
}

// 🔍 Buscar uma missão pelo ID
export async function getMissaoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const missao = await prisma.missao.findUnique({ where: { id } });
    if (!missao) {
      return res.status(404).json({ message: "Missão não encontrada" });
    }
    res.json(missao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar missão" });
  }
}

// ➕ Criar nova missão
export async function createMissao(req, res) {
  const { descricao, premio, concluido, conquistasId } = req.body;
  try {
    const novaMissao = await prisma.missao.create({
      data: {
        descricao,
        premio,
        concluido: concluido || false,
        conquistasId
      }
    });
    res.status(201).json(novaMissao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar missão" });
  }
}

// ✏️ Atualizar missão inteira (PUT)
export async function updateMissao(req, res) {
  const id = parseInt(req.params.id);
  const { descricao, premio, concluido, conquistasId } = req.body;
  try {
    const missaoAtualizada = await prisma.missao.update({
      where: { id },
      data: {
        descricao,
        premio,
        concluido,
        conquistasId
      }
    });
    res.json(missaoAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar missão" });
  }
}

// ✏️ Atualização parcial (PATCH)
export async function partialUpdateMissao(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body; // Pode conter campos parciais
  try {
    const missaoAtualizada = await prisma.missao.update({
      where: { id },
      data
    });
    res.json(missaoAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar missão" });
  }
}

// ❌ Deletar missão
export async function deleteMissao(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.missao.delete({ where: { id } });
    res.json({ message: "Missão deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar missão" });
  }
}

export default {
  getAllMissoes,
  getMissaoById,
  createMissao,
  updateMissao,
  partialUpdateMissao,
  deleteMissao
};
