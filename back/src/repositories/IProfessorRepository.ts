import { CreateProfessorDto } from "src/dtos/create/create-professor";

export abstract class IProfessorRepository {
  abstract create(professor: CreateProfessorDto): Promise<any>;
  abstract getUser(name:string): Promise<any>;
}