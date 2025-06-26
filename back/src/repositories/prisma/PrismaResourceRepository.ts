import { PrismaService } from 'src/database/prisma.service';
import { IResourceRepository } from '../IResourceRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaResourceRepository implements IResourceRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any> {
    return await this.prisma.reservaRecurso.findMany({
      include: {
        recurso: {
          include: {
            sala: true,
          },
        },
        professor: {
          select: {
            nome: true,
          },
        },
      },
    });
  }
}
