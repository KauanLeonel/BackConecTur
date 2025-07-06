import { update } from "../../models/userModel.js";

export default async function putUserController(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.body;

    const result = await update(id, user);

    return res.json({
      message: "Usuário alterado com sucesso",
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
