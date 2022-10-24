import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllFuncionario(req, res) {
    try {
      const funcionarios = await prisma.funcionario.findMany();
      return res.status(200).json(funcionarios);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createFuncionario(req, res) {
    try {
      const { nome, data_nasci, email, telefone, cargo } = req.body;
      const funcionario = await prisma.funcionario.create({
        data: {
          nome,
          data_nasci,
          email,
          telefone,
          cargo,
        },
      });

      return res.status(201).json(funcionario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateFuncionario(req, res) {
    try {
      const { id } = req.params;
      const { nome, data_nasci, email, telefone, cargo } = req.body;

      const funcionario = await prisma.funcionario.findUnique({
        where: { id: Number(id) },
      });

      if (!funcionario) {
        res.status(404).json({ message: "funcionário não encontrado!" });
      }

      await prisma.funcionario.update({
        where: { id: Number(id) },
        data: {
          nome,
          data_nasci,
          email,
          telefone,
          cargo,
        },
      });
      return res.status(200).json(funcionario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteFuncionario(req, res) {
    try {
      const { id } = req.params;
      const funcionario = await prisma.funcionario.findUnique({
        where: { id: Number(id) },
      });

      if (!funcionario) {
        res.status(404).json("Este funcionário não existe!");
      }

      await prisma.funcionario.delete({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ message: "Cadastro deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
