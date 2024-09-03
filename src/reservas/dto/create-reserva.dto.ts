import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  name: string; // Campo para nome do cliente

  @IsDateString()
  dateStart: Date;

  @IsDateString()
  dateEnd: Date;

  @IsString()
  phone: string; // Campo para telefone (opcional)

  @IsNumber()
  seatCount: number; // Campo para quantidade de assentos
}
