import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getUserByIdController(req, res, next) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json(user);

  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    next(error);
  }
}
