import { Router } from "express";

import clienteController from "../controllers/cliente/clienteController";
import vacinaController from "../controllers/vacina/vacinaController";
import veterinarioController from "../controllers/veterinario/veterinarioController";
import funcionarioController from "../controllers/funcionario/funcionarioController";

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

// veterinario
router.get("/veterinarios", veterinarioController.findAllVeterinario);
router.post("/veterinario", veterinarioController.createVeterinario);
router.put("/veterinario/:id", veterinarioController.updateVeterinario);
router.delete("/veterinario/:id", veterinarioController.deleteVeterinario);

// funcionario
router.get("/funcionarios", funcionarioController.findAllFuncionario);
router.post("/funcionario", funcionarioController.createFuncionario);
router.put("/funcionario/:id", funcionarioController.updateFuncionario);
router.delete("/funcionario/:id", funcionarioController.deleteFuncionario);

export { router };
