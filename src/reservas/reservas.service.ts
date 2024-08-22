import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservasService {
  private reservas = [];

  create(createReservaDto: CreateReservaDto) {
    const { mesaId, dateStart, dateEnd } = createReservaDto;

    // Verifica se a mesa está disponível por dia e hora
    const isAvailable = this.checkAvailability(mesaId, dateStart, dateEnd);
    if (!isAvailable) {
      return { status: 'error', message: 'Mesa não disponível no horário solicitado.' };
    }

    // Salvando a reserva
    const newReserva = { id: Date.now(), ...createReservaDto };
    this.reservas.push(newReserva);

    return { status: 'success', message: 'Reserva criada com sucesso.', data: newReserva };
  }

  private checkAvailability(mesaId: number, dateStart: Date, dateEnd: Date): boolean {
    // Verifica se há reservas iguais
    const conflictingReserva = this.reservas.find(reserva => 
      reserva.mesaId === mesaId &&
      (
        (dateStart >= reserva.dateStart && dateStart < reserva.dateEnd) ||
        (dateEnd > reserva.dateStart && dateEnd <= reserva.dateEnd) ||
        (dateStart <= reserva.dateStart && dateEnd >= reserva.dateEnd)
      )
    );

    return !conflictingReserva;
  }

  findAll() {
    return this.reservas;
  }

  findOne(id: number) {
    return this.reservas.find(reserva => reserva.id === id);
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    const reservaIndex = this.reservas.findIndex(reserva => reserva.id === id);
    if (reservaIndex === -1) {
      return { status: 'error', message: 'Reserva não encontrada.' };
    }

    // Atualiza a reserva
    this.reservas[reservaIndex] = { ...this.reservas[reservaIndex], ...updateReservaDto };

    return { status: 'success', message: 'Reserva atualizada com sucesso.', data: this.reservas[reservaIndex] };
  }

  remove(id: number) {
    const reservaIndex = this.reservas.findIndex(reserva => reserva.id === id);
    if (reservaIndex === -1) {
      return { status: 'error', message: 'Reserva não encontrada.' };
    }

    // Remove a reserva
    this.reservas.splice(reservaIndex, 1);

    return { status: 'success', message: 'Reserva removida com sucesso.' };
  }
}
