import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChefDto } from './dto/create-chef.dto';
import { UpdateChefDto } from './dto/update-chef.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ChefsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createChefDto: CreateChefDto) {
    const { name, bio, role, image, yearsOfExperience } = createChefDto;

    const chef = await this.prisma.chef.findUnique({
      where: {
        name,
      },
    });

    if (chef) {
      throw new ConflictException('Chef já cadastrado');
    }

    return this.prisma.chef.create({
      data: {
        name,
        bio,
        role,
        image,
        yearsOfExperience,
      },
    });
  }

  async findAll() {
    return this.prisma.chef.findMany();
  }

  findOne(id: number) {
    const chef = this.prisma.chef.findUnique({
      where: {
        id,
      },
    });

    if (!chef) {
      throw new NotFoundException('Chef não encontrado');
    }

    return chef;
  }

  update(id: number, updateChefDto: UpdateChefDto) {
    const chef = this.prisma.chef.findUnique({
      where: {
        id,
      },
    });

    if (!chef) {
      throw new NotFoundException('Chef não encontrado');
    }

    return this.prisma.chef.update({
      where: {
        id,
      },
      data: updateChefDto,
    });
  }

  remove(id: number) {
    const chef = this.prisma.chef.findUnique({
      where: {
        id,
      },
    });

    if (!chef) {
      throw new NotFoundException('Chef não encontrado');
    }

    return this.prisma.chef.delete({
      where: {
        id,
      },
    });
  }
}
