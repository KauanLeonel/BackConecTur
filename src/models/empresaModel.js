import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const empresaSchema = z.object({
  usuarioId: z.number().int().positive(),
  cnpj: z.string().min(14).max(18),
});

export const validateEmpresa = (data, partial = false) =>
  partial ? empresaSchema.partial().safeParse(data) : empresaSchema.safeParse(data);

export async function createEmpresa(data) {
  return await prisma.empresa.create({ data });
}

export async function getEmpresaByUsuarioId(usuarioId) {
  return await prisma.empresa.findUnique({ where: { usuarioId } });
}

export async function getEmpresas() {
  return await prisma.empresa.findMany();
}

export async function updateEmpresa(usuarioId, data) {
  return await prisma.empresa.update({ where: { usuarioId }, data });
}

export async function deleteEmpresa(usuarioId) {
  return await prisma.empresa.delete({ where: { usuarioId } });
}
    