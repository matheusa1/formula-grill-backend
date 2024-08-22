import {ConflictException, Injectable, NotFoundException,} from '@nestjs/common';
import { CreatePratoDto } from './dto/create-prato.dto';
import { UpdatePratoDto } from './dto/update-prato.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PratoService {
    constructor(private readonly prisma: PrismaService) {}
}