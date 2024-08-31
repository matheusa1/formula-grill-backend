import { IsNotEmpty, IsInt, IsString, IsUrl } from 'class-validator';

export class CreatePratoDto {
  @IsNotEmpty({
    message: 'Descrição deve ser preenchida!',
  })
  description: string;

  @IsNotEmpty({
    message: 'Nome deve ser preenchido!',
  })
  name: string;

  @IsNotEmpty({
    message: 'Categoria deve ser preenchida!',
  })
  @IsInt({
    message: 'Categoria deve ser um número inteiro!',
  })
  category: number;

  @IsString({
    message: 'Imagem deve ser uma string!',
  })
  @IsUrl(
    {},
    {
      message: 'Imagem deve ser uma URL válida!',
    },
  )
  image: string;
}
