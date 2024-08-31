import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsString({
    message: 'Nome é obrigatório',
  })
  name: string;
}
