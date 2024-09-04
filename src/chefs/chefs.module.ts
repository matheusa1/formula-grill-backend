import { Module } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { ChefsController } from './chefs.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [ChefsController],
  providers: [ChefsService, PrismaService],
})
export class ChefsModule {}
