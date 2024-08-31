import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaService } from 'src/database/prisma.service';
export declare class MesasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMesaDto: CreateMesaDto): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateMesaDto: UpdateMesaDto): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
