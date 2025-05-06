import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { IProfessorRepository } from './repositories/IProfessorRepository';
import { CreateProfessorDto } from './dtos/create/create-professor';

@Injectable()
export class AppService {
  constructor(private professorRepo: IProfessorRepository) {}

  async create(professor:CreateProfessorDto){
    const newUser =  await this.professorRepo.create(professor);
    return newUser;
  }

  async getUser(name:string){
    const users = await this.professorRepo.getUser(name);
    return users;
  }
}
