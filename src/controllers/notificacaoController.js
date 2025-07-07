import prisma from "../utils/prisma.js";

// 🔍 Buscar todas as notificações
export async function getAllNotificacoes(req, res) {
  try {
    const notificacoes = await prisma.notificacao.findMany();
    res.json(notificacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar notificações" });
  }
}

// 🔍 Buscar uma notificação pelo ID
export async function getNotificacaoById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const notificacao = await prisma.notificacao.findUnique({ where: { id } });
    if (!notificacao) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }
    res.json(notificacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar notificação" });
  }
}

// ➕ Criar nova notificação
export async function createNotificacao(req, res) {
  const { mensagem, dataHoraEnvio, cidadaoId } = req.body;
  try {
    const novaNotificacao = await prisma.notificacao.create({
      data: {
        mensagem,
        data_hora_envio: dataHoraEnvio || new Date(),
        cidadao_id: cidadaoId
      }
    });
    res.status(201).json(novaNotificacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar notificação" });
  }
}

// ✏️ Atualizar notificação inteira (PUT)
export async function updateNotificacao(req, res) {
  const id = parseInt(req.params.id);
  const { mensagem, dataHoraEnvio, cidadaoId } = req.body;
  try {
    const notificacaoAtualizada = await prisma.notificacao.update({
      where: { id },
      data: {
        mensagem,
        data_hora_envio: dataHoraEnvio,
        cidadao_id: cidadaoId
      }
    });
    res.json(notificacaoAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar notificação" });
  }
}

// ✏️ Atualização parcial (PATCH)
export async function partialUpdateNotificacao(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const notificacaoAtualizada = await prisma.notificacao.update({
      where: { id },
      data
    });
    res.json(notificacaoAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar notificação" });
  }
}

// ❌ Deletar notificação
export async function deleteNotificacao(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.notificacao.delete({ where: { id } });
    res.json({ message: "Notificação deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar notificação" });
  }
}

export default {
  getAllNotificacoes,
  getNotificacaoById,
  createNotificacao,
  updateNotificacao,
  partialUpdateNotificacao,
  deleteNotificacao
};
