import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateFaceVectorDto {
  @IsNotEmpty({ message: 'value is required' })
  @IsNumber({}, { message: 'value must be a number' })
  value: number;

  @IsNotEmpty({ message: 'Index is required' })
  @IsInt({ message: 'Index must be an integer' })
  @Min(0, { message: 'Index must be a non-negative integer' })
  index: number;

  @IsNotEmpty({ message: 'Professor ID is required' })
  professorId: string;
}
