import express from "express";
import {
    getAllEventos,
    getEventoById,
    createEvento,
    partialUpdateEvento,
    updateEvento,
    deleteEvento
} from "../controllers/eventoAdministradorController.js";

const router = express.Router();

// Definição das rotas para Eventos
router.get("/", getAllEventos);
router.get("/:id", getEventoById);
router.post("/", createEvento);
router.put("/:id", updateEvento);
router.patch("/:id", partialUpdateEvento);
router.delete("/:id", deleteEvento);

export default router;
