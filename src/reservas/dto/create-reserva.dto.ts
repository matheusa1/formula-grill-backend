// dto/create-reserva.dto.ts
import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class CreateReservaDto {
  @IsInt({
    message: 'O ID da mesa deve ser um número inteiro',
  })
  @IsNotEmpty({
    message: 'O ID da mesa é obrigatório',
  })
  mesaId: number;

  @IsDate({
    message: 'A data de início deve ser uma data válida',
  })
  @IsNotEmpty({
    message: 'A data de início é obrigatória',
  })
  dateStart: Date;

  @IsDate({
    message: 'A data de término deve ser uma data válida',
  })
  @IsNotEmpty({
    message: 'A data de término é obrigatória',
  })
  dateEnd: Date;

  @IsInt({
    message: 'O ID do usuário deve ser um número inteiro',
  })
  @IsNotEmpty({
    message: 'O ID do usuário é obrigatório',
  })
  userID: number;
}
