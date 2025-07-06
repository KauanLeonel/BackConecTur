import { update, taskValidator } from "../../models/taskModel.js";

export default async function putTaskController(req, res, next) {
    try {
        const { id } = req.params;
        const task = req.body;

        // Faz a validação parcial: só valida os campos enviados
        const { success, error, data } = taskValidator(task, { titulo: true, description: true, validacao: true, userId: true });

        if (!success) {
            return res.status(400).json({
                message: 'Erro ao atualizar tarefa, verifique os campos!',
                errors: error.flatten().fieldErrors
            });
        }

        const result = await update(id, data);

        return res.json({
            message: "Tarefa atualizada com sucesso",
            task: result
        });
    } catch (error) {
        next(error);
    }
}
