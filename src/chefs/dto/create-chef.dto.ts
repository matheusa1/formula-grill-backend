import { IsNumber, IsString } from 'class-validator';

export class CreateChefDto {
  @IsString({
    message: 'O nome do chef é obrigatório',
  })
  name: string;

  @IsString({
    message: 'A biografia do chef é obrigatório',
  })
  bio: string;

  @IsString({
    message: 'O papel do chef é obrigatório',
  })
  role: string;

  @IsString({
    message: 'A imagem do chef é obrigatório',
  })
  image: string;

  @IsNumber({})
  yearsOfExperience: number;
}
