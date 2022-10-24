import { Router } from "express";

import clienteController from "../controllers/cliente/clienteController";

const router = Router();

router.get("/clientes", clienteController.findAllCliente);

export { router };
