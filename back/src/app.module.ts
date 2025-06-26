import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { PrismaProfessorRepository } from './repositories/prisma/PrismaProfessorRepository';
import { IProfessorRepository } from './repositories/IProfessorRepository';
import { IResourceRepository } from './repositories/IResourceRepository';
import { PrismaResourceRepository } from './repositories/prisma/PrismaResourceRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: IProfessorRepository,
      useClass: PrismaProfessorRepository,
    },
    {
      provide: IResourceRepository,
      useClass: PrismaResourceRepository,
    },
  ],
})
export class AppModule {}
