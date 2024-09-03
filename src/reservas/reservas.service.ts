import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';

@Injectable()
export class ReservasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto, user: UserFromJwt) {
    const { dateStart, dateEnd, phone, seatCount, name } = createReservaDto;

    // Convert date strings to Date objects
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    const getTableAvailable = await this.prisma.mesas.findMany({
      where: {
        seats: {
          gte: seatCount,
        },
        reserva: {
          none: {
            OR: [
              {
                dateStart: { lt: endDate },
                dateEnd: { gt: startDate },
              },
            ],
          },
        },
      },
    });

    if (getTableAvailable.length === 0) {
      throw new ConflictException(
        'Nenhuma mesa disponível no horário solicitado.',
      );
    }

    const mesaId = getTableAvailable[0].id;

    // Salvando a reserva no banco de dados
    try {
      const newReserva = await this.prisma.reservas.create({
        data: {
          dateStart: startDate,
          dateEnd: endDate,
          phone,
          seatCount,
          name: name,

          mesa: {
            connect: {
              id: mesaId,
            },
          },

          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return newReserva;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async checkAvailability(
    mesaId: number,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<boolean> {
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
    const res = await this.prisma.reservas.findMany();

    console.log({ res });

    return res;
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

    return {
      status: 'success',
      message: 'Reserva atualizada com sucesso.',
      data: updatedReserva,
    };
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

  async findMyReservations(user: UserFromJwt) {
    return await this.prisma.reservas.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      orderBy: {
        dateStart: 'desc',
      },
    });
  }
}
