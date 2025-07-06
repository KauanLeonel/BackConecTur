import { remove } from "../../models/taskModel.js";

export default async function deleteTaskController(req, res, next) {
  try {
    const { id } = req.params;

    const result = await remove(id);

    return res.json({
      message: `Tarefa ID ${id} excluída com sucesso!`,
      task: result
    });

  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({
        message: 'Tarefa não encontrada!'
      });
    }
    next(error);
  }
}
