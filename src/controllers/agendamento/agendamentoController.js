import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllAgendamento(req, res) {
    try {
      const agendamentos = await prisma.agendamento.findMany();
      return res.status(200).json(agendamentos);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createAgendamento(req, res) {
    const { id_cliente } = req.params;
    const { id_funcionario } = req.params;

    const { data, horario, telefone, observa__o } = req.body;

    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id_cliente) },
      });

      const funcionario = await prisma.funcionario.findUnique({
        where: { id: Number(id_funcionario) },
      });

      if (!cliente) {
        return res.status(404).json("Cliente não encontrado!");
      } else if (!funcionario) {
        return res.status(404).json("Funcionário não encontrado!");
      }

      const agendamento = await prisma.agendamento.create({
        data: {
          data,
          horario,
          telefone,
          observa__o,
          clienteid: cliente.id,
          funcionarioid: funcionario.id,
        },
        include: {
          cliente: true,
          funcionario: true,
        },
      });

      return res.status(201).json(agendamento);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateAgendamento(req, res) {
    const { id } = req.params;
    const { data, horario, telefone, observa__o, clienteid, funcionarioid } =
      req.body;

    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(clienteid) },
      });

      const funcionario = await prisma.funcionario.findUnique({
        where: { id: Number(funcionarioid) },
      });

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      } else if (!funcionario) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      const agendamento = await prisma.agendamento.update({
        where: { id: Number(id) },
        data: {
          data,
          horario,
          telefone,
          observa__o,
          clienteid: cliente.id,
          funcionarioid: funcionario.id,
        },
      });

      return res.status(200).json(agendamento);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteAgendamento(req, res) {
    const { id } = req.params;

    try {
      const agendamento = await prisma.agendamento.findUnique({
        where: { id: Number(id) },
      });
  
      if (!agendamento) {
        return res
          .status(404)
          .json({ message: "Este agendamento não foi encontrado!" });
      }
  
      await prisma.agendamento.delete({
        where: { id: Number(id) },
      });
  
      return res
        .status(200)
        .json({ message: "Agendamento deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
