import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

describe('CategoriasController', () => {
  let controller: CategoriasController;
  let service: CategoriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers:  [
        {
          provide: CategoriasService,
          useValue: {
            create: jest.fn(),  // mock de 'create'
            findAll: jest.fn(), // mock de 'findAll'
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('chamar service corretamente', async () => {
      const createCategoriaDto: CreateCategoriaDto = { name: 'nova categoria' };
      const result = {
        id: 1,
        name: 'nova categoria',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createCategoriaDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createCategoriaDto);
    });
  });

  describe('findAll', () => {
    it('deve retornar categorias', async () => {
      const result = [{
        id: 1,
        name: 'categoria',
        createdAt: new Date(),
        updatedAt: new Date(),
        dishes: [
          {
            id: 1,
            name: 'prato',
            description: 'desc. prato',
            categoryId: 1,
            image: 'imagem_url',
            createdAt: new Date(),
            updatedAt: new Date(),
          }],
      }];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
