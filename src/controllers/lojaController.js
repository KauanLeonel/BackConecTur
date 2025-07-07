import prisma from "../utils/prisma.js";

// 🔍 Buscar todas as lojas
export async function getAllLojas(req, res) {
  try {
    const lojas = await prisma.loja.findMany();
    res.json(lojas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar lojas" });
  }
}

// 🔍 Buscar uma loja por ID
export async function getLojaById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const loja = await prisma.loja.findUnique({ where: { id } });
    if (!loja) {
      return res.status(404).json({ message: "Loja não encontrada" });
    }
    res.json(loja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar loja" });
  }
}

// ➕ Criar nova loja
export async function createLoja(req, res) {
  const { nome } = req.body;
  try {
    const novaLoja = await prisma.loja.create({
      data: { nome }
    });
    res.status(201).json(novaLoja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar loja" });
  }
}

// ✏️ Atualizar loja inteira (PUT)
export async function updateLoja(req, res) {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  try {
    const lojaAtualizada = await prisma.loja.update({
      where: { id },
      data: { nome }
    });
    res.json(lojaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar loja" });
  }
}

// ✏️ Atualização parcial (PATCH)
export async function partialUpdateLoja(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const lojaAtualizada = await prisma.loja.update({
      where: { id },
      data
    });
    res.json(lojaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar loja" });
  }
}

// ❌ Deletar loja
export async function deleteLoja(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.loja.delete({ where: { id } });
    res.json({ message: "Loja deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar loja" });
  }
}

export default {
  getAllLojas,
  getLojaById,
  createLoja,
  updateLoja,
  partialUpdateLoja,
  deleteLoja
};
