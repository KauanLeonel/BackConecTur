import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const prefSchema = z.object({
  cidadaoId: z.number().int().positive(),
  notificacaoPush: z.boolean().optional(),
  notificacaoEmail: z.boolean().optional(),
  frequencia: z.string().optional(),
});

export const validatePreferencia = (data, partial = false) =>
  partial ? prefSchema.partial().safeParse(data) : prefSchema.safeParse(data);

export async function createPreferencia(data) {
  return await prisma.preferenciasNotificacao.create({ data });
}

export async function getPreferenciaByCidadaoId(cidadaoId) {
  return await prisma.preferenciasNotificacao.findUnique({ where: { cidadaoId } });
}

export async function getPreferencias() {
  return await prisma.preferenciasNotificacao.findMany();
}

export async function updatePreferencia(cidadaoId, data) {
  return await prisma.preferenciasNotificacao.update({ where: { cidadaoId }, data });
}

export async function deletePreferencia(cidadaoId) {
  return await prisma.preferenciasNotificacao.delete({ where: { cidadaoId } });
}
