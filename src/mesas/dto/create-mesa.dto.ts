import { IsNotEmpty, IsInt, IsBoolean, Min } from 'class-validator';

export class CreateMesaDto {
  @IsNotEmpty({
    message: 'Código da mesa é obrigatório',
  })
  code: string;

  @IsInt({
    message: 'A quantidade de assentos deve ser um número inteiro',
  })
  @Min(1, {
    message: 'A quantidade de assentos deve ser pelo menos 1',
  })
  seats: number;

  @IsBoolean({
    message: 'A disponibilidade deve ser um valor booleano',
  })
  status: boolean;
}
