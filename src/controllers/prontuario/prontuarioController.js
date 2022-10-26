import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllProntuarios(req, res) {
    try {
      const prontuarios = await prisma.prontuario.findMany();
      return res.status(201).json(prontuarios);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createProntuario(req, res) {
    const { id_animal } = req.params;
    const { id_veterinario } = req.params;
    const { id_vacina } = req.params;
    const { raca, data_atual, especie, porte, sexo } = req.body;

    try {
      const animal = await prisma.animal.findUnique({
        where: { id: Number(id_animal) },
      });

      const veterinario = await prisma.veterinario.findUnique({
        where: { id: Number(id_veterinario) },
      });

      const vacina = await prisma.vacina.findUnique({
        where: { id: Number(id_vacina) },
      });

      if (!animal) {
        return res
          .status(404)
          .json({ message: "Cadastro animal não encontrado!" });
      } else if (!veterinario) {
        return res
          .status(404)
          .json({ message: "Cadastro veterinario não encontrado!" });
      } else if (!vacina) {
        return res
          .status(404)
          .json({ message: "Cadastro vacina não encontrado!" });
      }

      const prontuario = await prisma.prontuario.create({
        data: {
          raca,
          data_atual,
          especie,
          porte,
          sexo,
          animalid: animal.id,
          veterinarioid: veterinario.id,
          vacinaid: vacina.id,
        },
        include: {
          animal: true,
          veterinario: true,
          vacina: true,
        },
      });

      return res.status(201).json(prontuario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateProntuario(req, res) {
    try {
      const { id } = req.params;
      const {
        raca,
        data_atual,
        especie,
        porte,
        sexo,
        animalid,
        veterinarioid,
        vacinaid,
      } = req.body;

      const prontuario = await prisma.prontuario.findUnique({
        where: { id: Number(id) },
      });

      if (!prontuario) {
        return res.status(404).json({ message: "Prontuario não encontrado!" });
      }

      await prisma.prontuario.update({
        where: { id: Number(id) },
        data: {
          raca,
          data_atual,
          especie,
          porte,
          sexo,
          animalid,
          veterinarioid,
          vacinaid,
        },
      });

      return res
        .status(200)
        .json({ message: "Prontuario atualizado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteProntuario(req, res) {
    const { id } = req.params;

    try {
      const prontuario = await prisma.prontuario.findUnique({
        where: { id: Number(id) },
      });

      if (!prontuario) {
        return res.status(404).json({ message: "Prontuario não encontrado!" });
      }

      await prisma.prontuario.delete({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ message: "Prontuario deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
