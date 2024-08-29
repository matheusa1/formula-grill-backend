import { IsNotEmpty, IsInt, IsBoolean, Min } from 'class-validator';

export class CreatePratoDto {
    @IsNotEmpty({
      message: 'Descrição deve ser preenchida!',
    })
    descricao: string;

    @IsNotEmpty({
        message: 'Nome deve ser preenchido!',
      })
    nome: string;

    @IsNotEmpty({
        message: 'Categoria deve ser preenchida!',
      })
    categoria: string;
  }