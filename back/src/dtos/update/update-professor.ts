import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { CreateFaceVectorDto } from "../create/create-face-vector";

export class UpdateProfessorDto {

  @IsNotEmpty({ message: 'Face Vector is required' })
  @IsArray({ message: 'Face Vector must be an array' })
  faceVector: CreateFaceVectorDto[];
}