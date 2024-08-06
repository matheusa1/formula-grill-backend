import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    try {
      const users = await this.prisma.users.findMany();

      console.log(users);

      return users;
    } catch (error) {
      return [];
    }
  }
}
