import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  nome: string;
  senha: string;
  email: string;
}
