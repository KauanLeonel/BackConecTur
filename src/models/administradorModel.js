import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const adminSchema = z.object({
  usuarioId: z.number().int().positive(),
  prontuario: z.string().min(1),
});

export const validateAdministrador = (data, partial = false) =>
  partial ? adminSchema.partial().safeParse(data) : adminSchema.safeParse(data);

export async function createAdministrador(data) {
  return await prisma.administrador.create({ data });
}

export async function getAdministradorByUsuarioId(usuarioId) {
  return await prisma.administrador.findUnique({ where: { usuarioId } });
}

export async function getAdministradores() {
  return await prisma.administrador.findMany();
}

export async function updateAdministrador(usuarioId, data) {
  return await prisma.administrador.update({ where: { usuarioId }, data });
}

export async function deleteAdministrador(usuarioId) {
  return await prisma.administrador.delete({ where: { usuarioId } });
}
