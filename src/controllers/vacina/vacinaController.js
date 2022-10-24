import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllVacina(req, res) {
    try {
      const vacinas = await prisma.vacina.findMany();
      return res.status(200).json(vacinas);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createVacina(req, res) {
    try {
      const { nome, validade, fabricante, volume } = req.body;
      await prisma.vacina.create({
        data: {
          nome,
          validade,
          fabricante,
          volume,
        },
      });
      return res
        .status(200)
        .json({ message: "Vacina cadastrada com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateVacina(req, res) {
    try {
      const { id } = req.params;
      const { nome, validade, fabricante, volume } = req.body;

      let vacina = await prisma.vacina.findUnique({
        where: { id: Number(id) },
      });

      if (!vacina) {
        res.status(400).json({ message: "Vacina não encontrada!" });
      }

      vacina = await prisma.vacina.update({
        where: { id: Number(id) },
        data: { nome, validade, fabricante, volume },
      });

      return res
        .status(200)
        .json({ message: "Vacina atualziada com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteVacina(req, res) {
    try {
      const { id } = req.params;
      await prisma.vacina.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Vacina deletada com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
