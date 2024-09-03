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
    const { category, description, name, image } = CreatePratoDto;

    const prato = await this.prisma.pratos.findUnique({
      where: {
        name,
      },
    });

    if (prato) {
      throw new ConflictException(`Prato já existe... Igual o Hamilton na F1`);
    }

    return this.prisma.pratos.create({
      data: {
        description,
        name,
        image,
        category: {
          connect: {
            id: category,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.pratos.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const prato = await this.prisma.pratos.findUnique({
      where: { id },
      include: {
        category: true,
      },
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

    const alreadyExists = await this.prisma.pratos.findFirst({
      where: {
        name: UpdatePratoDto.name,
        id: {
          not: id,
        },
      },
    });

    if (alreadyExists) {
      throw new ConflictException(
        `Já existe um prato com o nome ${UpdatePratoDto.name}`,
      );
    }

    return this.prisma.pratos.update({
      where: { id },
      data: {
        ...UpdatePratoDto,

        category: {
          connect: {
            id: UpdatePratoDto.category,
          },
        },
      },
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
