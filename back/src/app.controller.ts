import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProfessorDto } from './dtos/create/create-professor';

@Controller('professor')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async createUser(@Body() professor: CreateProfessorDto) {
    try {
      return await this.appService.create(professor);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async getUser(@Query('name') name: string) {
    try {
      return await this.appService.getUser(name);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('add-face-vector')
  async addFaceVector(
    @Query('id') professorId: string,
    @Body() faceVector: { faceVector: number[] },
  ) {
    try {
      const result = await this.appService.addFaceVector(
        professorId,
        faceVector,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('find-match')
  async findMatchingFaceVector(
    @Body() faceVector: { faceVector: number[] },
  ) {
    try {
      return await this.appService.findMatchingFaceVector(faceVector.faceVector);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
