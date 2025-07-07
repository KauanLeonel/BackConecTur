import prisma from "../utils/prisma.js";

// Buscar todas as preferências de notificação
export async function getAllPreferencias(req, res) {
  try {
    const preferencias = await prisma.preferenciasNotificacao.findMany();
    res.json(preferencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar preferências de notificação" });
  }
}

// Buscar uma preferência pelo ID
export async function getPreferenciaById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const preferencia = await prisma.preferenciasNotificacao.findUnique({ where: { id } });
    if (!preferencia) {
      return res.status(404).json({ message: "Preferência não encontrada" });
    }
    res.json(preferencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar preferência" });
  }
}

// Criar nova preferência de notificação
export async function createPreferencia(req, res) {
  const { cidadao_id, notificacao_push = true, notificacao_email = true, frequencia } = req.body;
  try {
    const novaPreferencia = await prisma.preferenciasNotificacao.create({
      data: {
        cidadao_id,
        notificacao_push,
        notificacao_email,
        frequencia
      }
    });
    res.status(201).json(novaPreferencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar preferência" });
  }
}

// Atualizar preferência inteira (PUT)
export async function updatePreferencia(req, res) {
  const id = parseInt(req.params.id);
  const { cidadao_id, notificacao_push, notificacao_email, frequencia } = req.body;
  try {
    const preferenciaAtualizada = await prisma.preferenciasNotificacao.update({
      where: { id },
      data: {
        cidadao_id,
        notificacao_push,
        notificacao_email,
        frequencia
      }
    });
    res.json(preferenciaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar preferência" });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdatePreferencia(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const preferenciaAtualizada = await prisma.preferenciasNotificacao.update({
      where: { id },
      data
    });
    res.json(preferenciaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar preferência" });
  }
}

// Deletar preferência
export async function deletePreferencia(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.preferenciasNotificacao.delete({ where: { id } });
    res.json({ message: "Preferência deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar preferência" });
  }
}

export default {
  getAllPreferencias,
  getPreferenciaById,
  createPreferencia,
  updatePreferencia,
  partialUpdatePreferencia,
  deletePreferencia
};
