import { IsNotEmpty, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateReservaDto {
  @IsNumber()
  mesaId: number;

  @IsDateString()
  dateStart: string;

  @IsDateString()
  dateEnd: string;

  @IsOptional()
  @IsString()
  phone?: string; // Campo para telefone (opcional)

  @IsNumber()
  seatCount: number; // Campo para quantidade de assentos
}
