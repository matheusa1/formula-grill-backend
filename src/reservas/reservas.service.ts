import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';



@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto) {
    const { mesaId, dateStart, dateEnd, phone, seatCount } = createReservaDto;

    // Convert date strings to Date objects
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    // Verifica se a mesa está disponível por dia e hora
    const isAvailable = await this.checkAvailability(mesaId, startDate, endDate);
    if (!isAvailable) {
      return { status: 'error', message: 'Mesa não disponível no horário solicitado.' };
    }

    // Salvando a reserva no banco de dados
    try {
      const newReserva = await this.prisma.reservas.create({
        data: {
          //mesaId,
          dateStart: startDate,
          dateEnd: endDate,
          phone,
          seatCount,
        },
      });

      return { status: 'success', message: 'Reserva criada com sucesso.', data: newReserva };
    } catch (error) {
      return { status: 'error', message: 'Erro ao criar reserva.' };
    }
  }

  private async checkAvailability(mesaId: number, dateStart: Date, dateEnd: Date): Promise<boolean> {
    const conflictingReserva = await this.prisma.reservas.findFirst({
      where: {
        mesaId,
        OR: [
          {
            dateStart: { lte: dateEnd },
            dateEnd: { gte: dateStart },
          },
        ],
      },
    });

    return !conflictingReserva;
  }

  async findAll() {
    return this.prisma.reservas.findMany();
  }

  async findOne(id: number) {
    return this.prisma.reservas.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    const reservaExists = await this.findOne(id);
    if (!reservaExists) {
      return { status: 'error', message: 'Reserva não encontrada.' };
    }

    // Atualiza a reserva
    const updatedReserva = await this.prisma.reservas.update({
      where: { id },
      data: { ...updateReservaDto },
    });

    return { status: 'success', message: 'Reserva atualizada com sucesso.', data: updatedReserva };
  }

  async remove(id: number) {
    const reservaExists = await this.findOne(id);
    if (!reservaExists) {
      return { status: 'error', message: 'Reserva não encontrada.' };
    }

    // Remove a reserva
    await this.prisma.reservas.delete({
      where: { id },
    });

    return { status: 'success', message: 'Reserva removida com sucesso.' };
  }
}