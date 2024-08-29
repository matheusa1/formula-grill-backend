import {
ConflictException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { CreatePratoDto } from './dto/create-prato.dto';
import { UpdatePratoDto } from './dto/update-prato.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
    export class PratoService {
    constructor(private readonly prisma: PrismaService) {}

    async create(CreatePratoDto: CreatePratoDto) {
    }

    findAll() {
        return this.prisma.pratos.findMany();
    }

    async findOne(id: number) {
        const prato = await this.prisma.pratos.findUnique({
            where: { id },
        });

        if (!prato) {
            throw new NotFoundException(
                `Prato não encontrado. Encontrar este prato está mais difícil do que ver uma Haas pontuando!`,
            );
        }

        return prato;
    }

    async update(id: number, UpdatePratoDto: UpdatePratoDto) {
        const prato = await this.prisma.pratos.findUnique({
            where: { id },
        });

        if (!prato) {
            throw new NotFoundException(
                `Prato não foi encontrado...Igual o mundial de pilotos do Lando Norris`,
            );
        }

        return this.prisma.pratos.update({
            where: { id },
            data: UpdatePratoDto,
        });
    }

    async remove(id: number) {
        const prato = await this.prisma.pratos.findUnique({
            where: { id },
        });

        if (!prato) {
            throw new NotFoundException(
                `Prato não foi encontrado... Você pode fazer igual a Ferrari e tentar novamente. E novamente. E novamente...`,
            );
        }

        return this.prisma.pratos.delete({
            where: { id },
        });
    }
}