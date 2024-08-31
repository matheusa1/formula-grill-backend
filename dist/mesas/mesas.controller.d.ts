import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
export declare class MesasController {
    private readonly mesasService;
    constructor(mesasService: MesasService);
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
    findOne(id: string): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateMesaDto: UpdateMesaDto): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        code: string;
        seats: number;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
