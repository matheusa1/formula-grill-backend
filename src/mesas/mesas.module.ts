import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [MesasController],
  providers: [MesasService, PrismaService],
})
export class MesasModule {}
