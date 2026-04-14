import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.funcionariosCreateInput) {
    return this.prisma.funcionarios.create({ data });
  }

  async findAll(skip?: number, take?: number) {
    return this.prisma.funcionarios.findMany({
      skip,
      take,
      include: {
        profiles: true,
        documentos: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.funcionarios.findUnique({
      where: { id },
      include: {
        profiles: true,
        documentos: true,
        itens_contrato: true,
        manutencoes: true,
        operacoes: true,
      },
    });
  }

  async update(id: string, data: Prisma.funcionariosUpdateInput) {
    return this.prisma.funcionarios.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.funcionarios.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.funcionarios.findFirst({
      where: { email },
    });
  }

  async findAtivos() {
    return this.prisma.funcionarios.findMany({
      where: { ativo: true, deleted_at: null },
    });
  }
}
