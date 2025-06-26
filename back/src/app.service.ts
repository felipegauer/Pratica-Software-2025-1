import { Injectable } from '@nestjs/common';
import { IProfessorRepository } from './repositories/IProfessorRepository';
import { CreateProfessorDto } from './dtos/create/create-professor';
import { IResourceRepository } from './repositories/IResourceRepository';

@Injectable()
export class AppService {
  constructor(
    private professorRepo: IProfessorRepository,
    private resourceRepo: IResourceRepository,
  ) {}

  async create(professor: CreateProfessorDto) {
    const newUser = await this.professorRepo.create(professor);
    if (!newUser) throw new Error('Failed to create professor');

    return newUser;
  }

  async getUser(name: string) {
    const users = await this.professorRepo.getUser(name);
    if (!users || users.length === 0) throw new Error('User not found');

    return users;
  }

  async addFaceVector(professorId: string, body: { faceVector: number[] }) {
    const faceVectorDto = body.faceVector.map((value, index) => ({
      value,
      index,
    }));
    const result = await this.professorRepo.addFaceVector(
      professorId,
      faceVectorDto,
    );
    if (!result) throw new Error('Failed to add face vector');

    return result;
  }

  async findMatchingFaceVector(faceVector: number[]) {
    const professors = await this.professorRepo.findAllWithFaceVector();
    if (!professors || professors.length === 0)
      throw new Error('No professors found');

    if (faceVector.length !== 128)
      throw new Error('Invalid face vector length');

    let bestMatch: {
      professor: (typeof professors)[0] | null;
      distance: number;
    } = {
      professor: null,
      distance: Infinity,
    };

    for (const professor of professors) {
      if (!professor.faceVector || professor.faceVector.length === 0) continue;

      const sortedVector = professor.faceVector
        .sort((a, b) => a.index - b.index)
        .map((fv) => parseFloat(fv.value));

      if (sortedVector.length !== 128) continue;

      const distance = Math.sqrt(
        faceVector.reduce((acc, val, i) => {
          const diff = val - sortedVector[i];
          return acc + diff * diff;
        }, 0),
      );

      // console.log(`Distance for ${professor.nome}: ${distance}`);

      if (distance < bestMatch.distance) {
        bestMatch = {
          professor,
          distance,
        };
      }
    }

    const threshold = 0.45; // limite

    if (!bestMatch.professor || bestMatch.distance > threshold) {
      throw new Error('No matching professor found');
    }

    return {
      id: bestMatch.professor.id,
      name: bestMatch.professor.nome,
      distance: bestMatch.distance,
    };
  }

  async findByIdWithResources(professorId: string) {
    const professor =
      await this.professorRepo.findByIdWithResources(professorId);
    if (!professor) throw new Error('Professor not found');
    return {
      id: professor.id,
      nome: professor.nome,
      matricula: professor.matricula,
      reservas: professor.reservas.map((r) => ({
        periodo: r.periodo,
        data: r.data,
        recursoId: r.recurso.id,
        recursoType: r.recurso.descricao,
        reservado: r.recurso.reservado,
        sala: r.recurso.sala,
        professor: professor.nome,
      })),
    };
  }

  async findAllResources() {
    const resources = await this.resourceRepo.findAll();
    if (!resources || resources.length === 0) return null;
    return resources.map((resource) => ({
      periodo: resource.reservas[0]?.periodo || null,
      data: resource.reservas[0]?.data || null,
      recursoId: resource.id,
      recursoType: resource.descricao,
      reservado: resource.reservado,
      sala: resource.sala,
      professor: resource.reservas[0]?.professor?.nome || null,
    }));
  }
  // async findMatchingFaceVector(faceVector: number[]) {
  //   const professors = await this.professorRepo.findAllWithFaceVector();
  //   if (!professors || professors.length === 0)
  //     throw new Error('No professors found');

  //   if (faceVector.length === 0 || faceVector.length !== 128)
  //     throw new Error('Invalid face vector length');

  //   const bestMatch: {
  //     professor: {
  //       id: string;
  //       name: string;
  //       faceVector: { value: string; index: number }[];
  //     } | null;
  //     similarity: number;
  //   } = {
  //     professor: null,
  //     similarity: 0,
  //   };

  //   professors.filter((p) => {
  //     if (!p.faceVector || p.faceVector.length === 0) return false;

  //     const sortedProfessor = p.faceVector
  //       .sort((a, b) => a.index - b.index)
  //       .map((fv) => parseFloat(fv.value));

  //     const totalError = sortedProfessor.reduce((acc, val, i) => {
  //       const error = Math.abs(val - faceVector[i]);
  //       return acc + error;
  //     }, 0);

  //     console.log(totalError);

  //     const averageError = totalError / faceVector.length;
  //     const similarity = 1 - averageError;

  //     console.log(`Similarity: ${similarity} for ${p.name}`);

  //     if(similarity>=0.75){
  //       if (similarity > bestMatch.similarity) {
  //         bestMatch.similarity = similarity;
  //         bestMatch.professor = p;
  //       }
  //       return true;
  //     }
  //     return false;
  //   });

  //   if (!bestMatch.professor) {
  //     throw new Error('No matching professor found');
  //   }

  //   return {
  //     id: bestMatch.professor.id,
  //     name: bestMatch.professor.name,
  //     similarity: bestMatch.similarity,
  //   };
  // }
}
