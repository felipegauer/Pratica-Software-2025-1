import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { IProfessorRepository } from './repositories/IProfessorRepository';
import { CreateProfessorDto } from './dtos/create/create-professor';

@Injectable()
export class AppService {
  constructor(private professorRepo: IProfessorRepository) {}

  async create(professor:CreateProfessorDto){
    const newUser =  await this.professorRepo.create(professor);
    if(!newUser) throw new Error('Failed to create professor');

    return newUser;
  }

  async getUser(name:string){
    const users = await this.professorRepo.getUser(name);
    if (!users || users.length === 0) throw new Error('User not found');

    return users;
  }

  async addFaceVector(professorId: string, body: {faceVector:number[]}) {
    const faceVectorDto = body.faceVector.map((value, index) => ({
      value,
      index,
    }));
    const result = await this.professorRepo.addFaceVector(professorId, faceVectorDto);
    if(!result) throw new Error('Failed to add face vector');

    return result;
  }
}
