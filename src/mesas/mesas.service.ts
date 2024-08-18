import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MesasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMesaDto: CreateMesaDto) {
    const { code } = createMesaDto;

    const codeAlreadyExists = await this.prisma.mesas.findUnique({
      where: {
        code,
      },
    });

    if (codeAlreadyExists) {
      throw new ConflictException(
        'Código da mesa já existe... Parece que temos um safety car na pista!',
      );
    }

    const mesa = await this.prisma.mesas.create({
      data: createMesaDto,
    });
    return mesa;
  }

  findAll() {
    return this.prisma.mesas.findMany();
  }

  async findOne(id: number) {
    const mesa = await this.prisma.mesas.findUnique({
      where: { id },
    });

    if (!mesa) {
      throw new NotFoundException(
        `Mesa com ID ${id} não encontrada... Parece que você perdeu essa curva!`,
      );
    }

    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.prisma.mesas.findUnique({
      where: { id },
    });

    if (!mesa) {
      throw new NotFoundException(
        `Mesa com ID ${id} não encontrada... Parece que essa corrida não vai terminar bem!`,
      );
    }

    return this.prisma.mesas.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  async remove(id: number) {
    const mesa = await this.prisma.mesas.findUnique({
      where: { id },
    });

    if (!mesa) {
      throw new NotFoundException(
        `Mesa com ID ${id} não encontrada... Bandeira vermelha, operação abortada!`,
      );
    }

    return this.prisma.mesas.delete({
      where: { id },
    });
  }
}
