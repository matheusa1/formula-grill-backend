import { PartialType } from '@nestjs/mapped-types';
import { CreatePratoDto } from './create-prato.dto';

export class UpdatePratoDto extends PartialType(CreatePratoDto) {}
