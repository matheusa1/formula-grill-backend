import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  mesaId: number;

  @IsDateString()
  dateStart: Date;

  @IsDateString()
  dateEnd: Date;

  @IsString()
  phone: string; // Campo para telefone (opcional)

  @IsNumber()
  seatCount: number; // Campo para quantidade de assentos
}
