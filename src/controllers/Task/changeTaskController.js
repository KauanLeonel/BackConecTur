import { update, taskValidator } from "../../models/taskModel.js";

export default async function patchTaskController(req, res, next) {
    try {
        const { id } = req.params;
        const task = req.body;

        // Validação parcial
        const { success, error, data } = taskValidator(task, true);

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
