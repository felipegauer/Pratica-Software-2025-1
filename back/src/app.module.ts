import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { PrismaProfessorRepository } from './repositories/prisma/PrismaProfessorRepository';
import { IProfessorRepository } from './repositories/IProfessorRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide:  IProfessorRepository,
      useClass: PrismaProfessorRepository,
    },
  ],
})
export class AppModule {}
