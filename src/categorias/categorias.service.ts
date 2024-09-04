import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const { name } = createCategoriaDto;

    const category = await this.prisma.categorias.findUnique({
      where: {
        name,
      },
    });

    if (category) {
      throw new ConflictException('Categoria já existe');
    }

    return await this.prisma.categorias.create({
      data: createCategoriaDto,
    });
  }

  async findAll() {
    return await this.prisma.categorias.findMany({
      include: { dishes: true },
    });
  }
}
