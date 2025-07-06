import { remove } from "../../models/userModel.js";

export default async function deleteUserController(req, res, next) {
  try {
    const { id } = req.params;

    const result = await remove(id);

    return res.json({
      message: `Usuário ID ${id} excluído com sucesso!`,
      user: result
    });
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({
        message: 'Usuário não encontrado!'
      });
    }
    next(error);
  }
}
