import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { CreateFaceVectorDto } from './create-face-vector';

export class CreateProfessorDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  nome: string;

  @IsOptional()
  faceVector?: CreateFaceVectorDto[];
}
