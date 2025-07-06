import { getList } from "../../models/taskModel.js";

export default async function getTaskController(req, res, next) {
  try {
    const result = await getList();
    return res.json(result);
  } catch (error) {
    next(error);
  }
}
