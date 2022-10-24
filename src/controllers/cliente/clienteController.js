import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllCliente(req, res) {
    try {
      const clientes = await prisma.cliente.findMany();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(400).json({ Message: error.Message });
    }
  },
};
