import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllVeterinario(req, res) {
    try {
      const veterinarios = await prisma.veterinario.findMany();
      return res.status(200).json(veterinarios);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createVeterinario(req, res) {
    try {
      const { nome, cpf, data_nasc, telefone, email, formacao } = req.body;
      const veterinario = await prisma.veterinario.create({
        data: {
          nome,
          cpf,
          data_nasc,
          telefone,
          email,
          formacao,
        },
      });

      return res.status(201).json(veterinario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateVeterinario(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, data_nasc, telefone, email, formacao } = req.body;

      const veterinario = await prisma.veterinario.findUnique({
        where: { id: Number(id) },
      });

      if (!veterinario) {
        res.status(404).json({ message: "Este usuário não foi encontrado!" });
      }

      await prisma.veterinario.update({
        where: { id: Number(id) },
        data: {
          nome,
          cpf,
          data_nasc,
          telefone,
          email,
          formacao,
        },
      });

      return res
        .status(200)
        .json(veterinario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteVeterinario(req, res) {
    try {
      const { id } = req.params;
      const veterinario = await prisma.veterinario.findUnique({
        where: { id: Number(id) },
      });

      if (!veterinario) {
        res.status(404).json("Este funcionário não existe!");
      }

      await prisma.veterinario.delete({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ message: "cadastro deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
