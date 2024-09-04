import { describe } from 'node:test';
import { MesasService } from '../mesas.service';
import { PrismaService } from '../../database/prisma.service';
import { mockCreateMesa, prismaMockMesa } from './mock';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('MesasService', () => {
  let service: MesasService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MesasService,
        { provide: PrismaService, useValue: prismaMockMesa },
      ],
    }).compile();

    service = module.get<MesasService>(MesasService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`findAll - should return an array of mesass`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(mockCreateMesa);
      expect(prisma.mesas.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.mesas.findMany).toHaveBeenCalledWith(/* nothing */);
    });
  });

  describe('findOne', () => {
    it(`findOne - should return a single mesas`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(mockCreateMesa[0]);
      expect(prisma.mesas.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.mesas.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`findOne - should return NotFoundException when no mesas is found`, async () => {
      jest.spyOn(prisma.mesas, 'findUnique').mockResolvedValue(undefined);

      const id = 99;

      try {
        await service.findOne(id);
      } catch (error) {
        expect(error).toEqual(
          new NotFoundException(
            `Mesa com ID ${id} não encontrada... Parece que você perdeu essa curva!`,
          ),
        );
      }

      expect(prisma.mesas.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('create', () => {
    it(`create - should create a new mesas`, async () => {
      const response = await service.create(mockCreateMesa[0]);

      expect(response).toBe(mockCreateMesa[0]);
      expect(prisma.mesas.create).toHaveBeenCalledTimes(1);
      expect(prisma.mesas.create).toHaveBeenCalledWith({
        data: mockCreateMesa[0],
      });
    });

    it(`create - should return an conflict when create a table with a pre existent name`, async () => {
      jest
        .spyOn(prisma.mesas, 'findUnique')
        .mockResolvedValue(mockCreateMesa[0]);

      try {
        await service.create(mockCreateMesa[0]);
      } catch (error) {
        expect(error).toEqual(
          new ConflictException(
            'Código da mesa já existe... Parece que temos um safety car na pista!',
          ),
        );
      }

      expect(prisma.mesas.findUnique).toHaveBeenCalledWith({
        where: {
          code: mockCreateMesa[0].code,
        },
      });
    });
  });

  describe('update', () => {
    it(`update - should update a mesas`, async () => {
      jest
        .spyOn(prisma.mesas, 'findUnique')
        .mockResolvedValue(mockCreateMesa[0]);

      const response = await service.update(1, mockCreateMesa[0]);

      expect(response).toBe(mockCreateMesa[0]);
      expect(prisma.mesas.update).toHaveBeenCalledTimes(1);
      expect(prisma.mesas.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockCreateMesa[0],
      });
    });

    it(`update - should return NotFoundException when no mesas is found`, async () => {
      jest.spyOn(prisma.mesas, 'findUnique').mockResolvedValue(undefined);

      const id = 99;

      try {
        await service.update(id, mockCreateMesa[0]);
      } catch (error) {
        expect(error).toEqual(
          new NotFoundException(
            `Mesa com ID ${id} não encontrada... Parece que essa corrida não vai terminar bem!`,
          ),
        );
      }

      expect(prisma.mesas.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('remove', () => {
    it(`remove - should remove a mesas`, async () => {
      jest
        .spyOn(prisma.mesas, 'findUnique')
        .mockResolvedValue(mockCreateMesa[0]);

      const response = await service.remove(1);

      expect(response).toBe(undefined);
      expect(prisma.mesas.delete).toHaveBeenCalledTimes(1);
      expect(prisma.mesas.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`remove - should return NotFoundException when no mesas is found`, async () => {
      jest.spyOn(prisma.mesas, 'findUnique').mockResolvedValue(undefined);

      const id = 99;

      try {
        await service.remove(id);
      } catch (error) {
        expect(error).toEqual(
          new NotFoundException(
            `Mesa com ID ${id} não encontrada... Bandeira vermelha, operação abortada!`,
          ),
        );
      }

      expect(prisma.mesas.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
