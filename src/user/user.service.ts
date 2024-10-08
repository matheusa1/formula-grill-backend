import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email, name } = createUserDto;

    const emailAlreadyExists = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new ConflictException('Email already exists');
    }

    const salt = 10;

    const passwordCrypt = await bcrypt.hash(password, salt);

    const user = await this.prisma.users.create({
      data: {
        password: passwordCrypt,
        email,
        name: name,
      },
    });

    return user;
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
