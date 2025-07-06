import { create, taskValidator } from "../../models/taskModel.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createTaskController(req, res, next) {
  try {
    const task = req.body;

    // Validação dos dados da task (você pode usar partial=true se quiser)
    const { success, error, data: validatedTask } = taskValidator(task);
    if (!success) {
      return res.status(400).json({
        message: 'Erro ao cadastrar a tarefa',
        errors: error.flatten().fieldErrors
      });
    }

    // Verifica se o userId existe no banco
    const userExists = await prisma.user.findUnique({
      where: { id: validatedTask.userId }
    });

    if (!userExists) {
      return res.status(400).json({
        message: "Usuário não encontrado com o userId informado"
      });
    }

    // Cria a task
    const result = await create(validatedTask);

    return res.status(201).json({
      message: "Tarefa criada com sucesso",
      task: result
    });

  } catch (error) {
    next(error);
  }
}
