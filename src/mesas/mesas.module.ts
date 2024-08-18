import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';

@Module({
  controllers: [MesasController],
  providers: [MesasService],
})
export class MesasModule {}
