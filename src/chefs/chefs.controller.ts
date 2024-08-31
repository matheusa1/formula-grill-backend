import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { CreateChefDto } from './dto/create-chef.dto';
import { UpdateChefDto } from './dto/update-chef.dto';

@Controller('chefs')
export class ChefsController {
  constructor(private readonly chefsService: ChefsService) {}

  @Post()
  create(@Body() createChefDto: CreateChefDto) {
    return this.chefsService.create(createChefDto);
  }

  @Get()
  findAll() {
    return this.chefsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chefsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChefDto: UpdateChefDto) {
    return this.chefsService.update(+id, updateChefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chefsService.remove(+id);
  }
}
