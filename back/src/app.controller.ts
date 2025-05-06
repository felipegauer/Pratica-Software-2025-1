import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProfessorDto } from './dtos/create/create-professor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async createUser(@Body() professor: CreateProfessorDto) {
    const newUser = this.appService.create(professor);
    return newUser;
  }

  @Get('professor')
  async getUser(@Query('name') name: string) {
    const user = this.appService.getUser(name);
    return user;
  }
}
