import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PratoService } from './prato.service';
import { CreatePratoDto } from './dto/create-prato.dto';
import { UpdatePratoDto } from './dto/update-prato.dto';

@Controller('pratos')
export class PratoController {
  constructor(private readonly PratoService: PratoService) {}

  @Post()
  create(@Body() CreatePratoDto: CreatePratoDto) {
    return this.PratoService.create(CreatePratoDto);
  }

  @Get()
  findAll() {
    return this.PratoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdatePratoDto: UpdatePratoDto) {
    return this.PratoService.update(+id, UpdatePratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PratoService.remove(+id);
  }
}
