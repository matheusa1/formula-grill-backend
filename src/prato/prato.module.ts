import { Module } from '@nestjs/common';
import { PratoService } from './prato.service';
import { PratoController } from './prato.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [PratoController],
  providers: [PratoService, PrismaService],
})
export class PratoModule {}
