import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { PrismaService } from 'src/database/prisma.service';
import { ConflictException } from '@nestjs/common';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        { //injeção de dependencias:
          provide: PrismaService,
          useValue: {
            categorias: {
              findUnique: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('create', () => {
    it('dar erro caso exista', async () => {
      const createCategoriaDto = { name: 'categoria' };
      prismaService.categorias.findUnique = jest.fn().mockResolvedValue(createCategoriaDto);

      await expect(service.create(createCategoriaDto)).rejects.toThrow(ConflictException);
      expect(prismaService.categorias.findUnique).toHaveBeenCalledWith({
        where: { name: createCategoriaDto.name },
      });
    });

    it('criar nova categoria', async () => {
      const createCategoriaDto = { name: 'nova categoria' };
      prismaService.categorias.findUnique = jest.fn().mockResolvedValue(null);
      prismaService.categorias.create = jest.fn().mockResolvedValue(createCategoriaDto);

      const result = await service.create(createCategoriaDto);
      expect(result).toEqual(createCategoriaDto);
      expect(prismaService.categorias.findUnique).toHaveBeenCalledWith({
        where: { name: createCategoriaDto.name },
      });
      expect(prismaService.categorias.create).toHaveBeenCalledWith({
        data: createCategoriaDto,
      });
    });
  });
});
