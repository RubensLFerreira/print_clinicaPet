import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllCliente(req, res) {
    try {
      const clientes = await prisma.cliente.findMany();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createCliente(req, res) {
    try {
      const {
        nome,
        cpf,
        data_nasc,
        telefone,
        email,
        endereco,
        bairro,
        numero,
      } = req.body;

      const cliente = await prisma.cliente.create({
        data: {
          nome,
          cpf,
          data_nasc,
          telefone,
          email,
          endereco,
          bairro,
          numero,
        },
      });

      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateCliente(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        cpf,
        data_nasc,
        telefone,
        email,
        endereco,
        bairro,
        numero,
      } = req.body;

      let cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) },
      });

      if (!cliente) {
        res.status(404).json({ message: "Cliente não encontrado!" });
      }

      cliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data: {
          nome,
          cpf,
          data_nasc,
          telefone,
          email,
          endereco,
          bairro,
          numero,
        },
      });

      return res.status(200).json("Cliente atualizado com sucesso!");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteCliente(req, res) {
    try {
      const { id } = req.params;
      await prisma.cliente.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "curso deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
