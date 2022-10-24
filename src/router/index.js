import { Router } from "express";

import clienteController from "../controllers/cliente/clienteController";
import vacinaController from "../controllers/vacina/vacinaController";

const router = Router();

// cliente
router.get("/clientes", clienteController.findAllCliente);
router.post("/cliente", clienteController.createCliente);
router.put("/cliente/:id", clienteController.updateCliente);
router.delete("/cliente/:id", clienteController.deleteCliente);

// vacina
router.get("/vacinas", vacinaController.findAllVacina);
router.post("/vacina", vacinaController.createVacina);
router.put("/vacina/:id", vacinaController.updateVacina);
router.delete("/vacina/:id", vacinaController.deleteVacina);

export { router };
