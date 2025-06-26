import { CreateFaceVectorDto } from 'src/dtos/create/create-face-vector';
import { CreateProfessorDto } from 'src/dtos/create/create-professor';

export abstract class IProfessorRepository {
  abstract create(professor: CreateProfessorDto): Promise<any>;
  abstract getUser(name: string): Promise<any>;
  abstract addFaceVector(
    professorId: string,
    faceVector: CreateFaceVectorDto[],
  ): Promise<any>;
  abstract findAllWithFaceVector(): Promise<any>;
  abstract findByIdWithResources(professorId: string): Promise<any>;
}
