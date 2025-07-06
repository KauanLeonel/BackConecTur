import { create, userValidator } from "../../models/userModel.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createUserController(req, res, next) {
  try {
    const user = req.body;

    const { success, error, data: userValidated } = userValidator(user);

    if (!success) {
      return res.status(400).json({
        message: 'Erro ao cadastrar o usuário',
        errors: error.flatten().fieldErrors
      });
    }

    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: userValidated.email }
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    const result = await create(userValidated);

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: result
    });

  } catch (error) {
    next(error);
  }
}
