import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { senha, email, nome } = createUserDto;

    try {
      const emailAlreadyExists = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (emailAlreadyExists) {
        throw new ConflictException('Email already exists');
      }

      const salt = 10;

      const passwordCrypt = await bcrypt.hash(senha, salt);

      const user = await this.prisma.users.create({
        data: {
          password: passwordCrypt,
          email,
          name: nome,
        },
      });

      return user;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
