import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { IProfessorRepository } from './repositories/IProfessorRepository';
import { CreateProfessorDto } from './dtos/create/create-professor';

@Injectable()
export class AppService {
  constructor(private professorRepo: IProfessorRepository) {}

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

    if (faceVector.length === 0 || faceVector.length !== 128)
      throw new Error('Invalid face vector length');

    const bestMatch: {
      professor: {
        id: string;
        name: string;
        faceVector: { value: string; index: number }[];
      } | null;
      similarity: number;
    } = {
      professor: null,
      similarity: 0,
    };

    professors.filter((p) => {
      const sortedProfessor = p.faceVector
        .sort((a, b) => a.index - b.index)
        .map((fv) => parseFloat(fv.value));

      const totalError = sortedProfessor.reduce((acc, val, i) => {
        const error = Math.abs(val - faceVector[i]);
        return acc + error;
      }, 0);

      console.log(totalError);

      const averageError = totalError / faceVector.length;
      const similarity = 1 - averageError;

      console.log(`Similarity: ${similarity} for ${p.name}`);

      if (similarity > bestMatch.similarity) {
        bestMatch.similarity = similarity;
        bestMatch.professor = p;
      }

      return similarity >= 0.75;
    });

    if (!bestMatch.professor) {
      throw new Error('No matching professor found');
    }

    return {
      id: bestMatch.professor.id,
      name: bestMatch.professor.name,
      similarity: bestMatch.similarity,
    };
  }
}
