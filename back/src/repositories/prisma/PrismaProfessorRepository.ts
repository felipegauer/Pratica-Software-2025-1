import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { IProfessorRepository } from '../IProfessorRepository';
import { CreateProfessorDto } from 'src/dtos/create/create-professor';
import { CreateFaceVectorDto } from 'src/dtos/create/create-face-vector';

@Injectable()
export class PrismaProfessorRepository implements IProfessorRepository {
  constructor(private prisma: PrismaService) {}

  async create(professor: CreateProfessorDto): Promise<any> {
    return this.prisma.professor.create({
      data: {
        ...professor,
        faceVector: professor.faceVector
          ? {
              create: professor.faceVector.map((vector) => ({
                ...vector,
              })),
            }
          : undefined,
      },
    });
  }

  async getUser(name: string): Promise<any> {
    return await this.prisma.professor.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async addFaceVector(
    professorId: string,
    faceVector: CreateFaceVectorDto[],
  ): Promise<any> {
    return await this.prisma.professor.update({
      where: {
        id: professorId,
      },
      data: {
        faceVector: {
          createMany: {
            data: faceVector,
          },
        },
      },
    });
  }
}
