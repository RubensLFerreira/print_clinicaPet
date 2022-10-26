import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllAnimal(req, res) {
    try {
      const animais = await prisma.animal.findMany();
      return res.status(200).json(animais);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createAnimal(req, res) {
    const { id_cliente } = req.params;
    const { nome, especie, sexo, raca, peso, data_nasc } = req.body;

    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id_cliente) },
      });

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      const animal = await prisma.animal.create({
        data: {
          nome,
          especie,
          sexo,
          raca,
          peso,
          data_nasc,
          clienteid: cliente.id,
        },
        include: {
          cliente: true,
        },
      });

      return res.status(201).json(animal);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateAnimal(req, res) {
    const { id } = req.params;
    const { nome, especie, sexo, raca, peso, data_nasc, clienteid } = req.body;

    try {
      const animal = await prisma.animal.findUnique({
        where: { id: Number(id) },
      });

      if (!animal) {
        return res.status(404).json({ message: "Animal não encontrado!" });
      }

      await prisma.animal.update({
        where: { id: Number(id) },
        data: {
          nome,
          especie,
          sexo,
          raca,
          peso,
          data_nasc,
          clienteid,
        },
      });

      return res
        .status(200)
        .json({ message: "Cadastro animal atualziado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteAnimal(req, res) {
    const { id } = req.params;

    try {
      const animal = await prisma.animal.findUnique({
        where: { id: Number(id) },
      });

      if (!animal) {
        return res.status(404).json({ message: "Animal não encontrado!" });
      }

      await prisma.animal.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "cadatro animal deletado com sucesso!"})
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
