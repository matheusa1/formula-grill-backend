import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Nome é um campo obrigatório',
  })
  name: string;
  @IsNotEmpty({
    message: 'Senha é um campo obrigatório',
  })
  password: string;
  @IsNotEmpty({
    message: 'E-mail é um campo obrigatório',
  })
  email: string;
}