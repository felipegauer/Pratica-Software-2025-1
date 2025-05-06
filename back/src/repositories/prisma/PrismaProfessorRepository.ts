import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { IProfessorRepository } from "../IProfessorRepository";
import { CreateProfessorDto } from "src/dtos/create/create-professor";

@Injectable()
export class PrismaProfessorRepository implements IProfessorRepository{
    constructor(private prisma: PrismaService) {}
    async create(professor: CreateProfessorDto): Promise<any> {
        return this.prisma.professor.create({
            data: {...professor}
        });
    }

    async getUser(name:string): Promise<any> {
        return await this.prisma.professor.findMany({
            where: {
                name:{
                    contains: name,
                }
            }
        });
    }

    
}