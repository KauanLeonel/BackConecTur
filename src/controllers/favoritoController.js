// controllers/favoritoController.js
import prisma from "../utils/prisma.js";

// Buscar todos os favoritos
export async function getAllFavoritos(req, res) {
  try {
    const favoritos = await prisma.favorito.findMany();
    res.json(favoritos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar favoritos" });
  }
}

// Buscar um favorito por ID
export async function getFavoritoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const favorito = await prisma.favorito.findUnique({ where: { id } });
    if (!favorito) {
      return res.status(404).json({ message: "Favorito não encontrado" });
    }
    res.json(favorito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar favorito" });
  }
}

// Criar novo favorito
export async function createFavorito(req, res) {
  const { cidadaoId, eventoId, dataFavoritado } = req.body;
  try {
    const novo = await prisma.favorito.create({
      data: {
        cidadaoId,
        eventoId,
        dataFavoritado: dataFavoritado ? new Date(dataFavoritado) : undefined,
      },
    });
    res.status(201).json(novo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar favorito" });
  }
}

// Atualizar totalmente um favorito (PUT)
export async function updateFavorito(req, res) {
  const id = parseInt(req.params.id);
  const { cidadaoId, eventoId, dataFavoritado } = req.body;
  try {
    const atualizado = await prisma.favorito.update({
      where: { id },
      data: {
        cidadaoId,
        eventoId,
        dataFavoritado: dataFavoritado ? new Date(dataFavoritado) : undefined,
      },
    });
    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar favorito" });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdateFavorito(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    if (data.dataFavoritado) {
      data.dataFavoritado = new Date(data.dataFavoritado);
    }
    const atualizado = await prisma.favorito.update({
      where: { id },
      data,
    });
    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar favorito parcialmente" });
  }
}

// Deletar favorito
export async function deleteFavorito(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.favorito.delete({ where: { id } });
    res.json({ message: "Favorito deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar favorito" });
  }
}

export default {
  getAllFavoritos,
  getFavoritoById,
  createFavorito,
  updateFavorito,
  partialUpdateFavorito,
  deleteFavorito,
};
