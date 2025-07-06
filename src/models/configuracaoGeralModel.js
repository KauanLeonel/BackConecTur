import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const configSchema = z.object({
  cidadaoId: z.number().int().positive(),
  tema: z.string().optional(),
  idioma: z.string().optional(),
  receberEmail: z.boolean().optional(),
});

export const validateConfiguracao = (data, partial = false) =>
  partial ? configSchema.partial().safeParse(data) : configSchema.safeParse(data);

export async function createConfiguracao(data) {
  return await prisma.configuracoesGerais.create({ data });
}

export async function getConfiguracaoByCidadaoId(cidadaoId) {
  return await prisma.configuracoesGerais.findUnique({ where: { cidadaoId } });
}

export async function getConfiguracoes() {
  return await prisma.configuracoesGerais.findMany();
}

export async function updateConfiguracao(cidadaoId, data) {
  return await prisma.configuracoesGerais.update({ where: { cidadaoId }, data });
}

export async function deleteConfiguracao(cidadaoId) {
  return await prisma.configuracoesGerais.delete({ where: { cidadaoId } });
}
