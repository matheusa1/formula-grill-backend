import { Test, TestingModule } from '@nestjs/testing';
import { ChefsController } from './chefs.controller';
import { ChefsService } from './chefs.service';
import { PrismaService } from 'src/database/prisma.service';
import { CreateChefDto } from './dto/create-chef.dto';

describe('ChefsController', () => {
  let controller: ChefsController;
  let service: ChefsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChefsController],
      providers:  [
        {
          provide: ChefsService,
          useValue: {
            create: jest.fn(),  
            findAll: jest.fn(), 
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<ChefsController>(ChefsController);
    service = module.get<ChefsService>(ChefsService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('chamar service corretamente', async () => {
      const createChefDto: CreateChefDto = {
        name: 'chef',
        bio: 'bio do chef',
        role: 'função',
        image: 'urldaimagem',
        yearsOfExperience: 1,
      };
      const result = {
        id: 1,
        name: 'chef',
        bio: 'bio',
        role: 'função',
        image:'urldaimagem',
        yearsOfExperience: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createChefDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createChefDto);
    });
  });

  describe('findAll', ()=> {
    it('deve retornar todos os chefs', async () => {
      const result = [{
        id: 1,
        name: 'chef',
        bio: 'bio',
        role: 'função',
        image:'urldaimagem',
        yearsOfExperience: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
        jest.spyOn(service, 'findAll').mockResolvedValue(result);
        expect(await controller.findAll()).toBe(result);
        expect(service.findAll).toHaveBeenCalled();
      });
    });

    describe('findOne', () => {
      it('deve retornar um chef', async() => {
        const result = [{
        id: 1,
        name: 'chef',
        bio: 'bio',
        role: 'função',
        image:'urldaimagem',
        yearsOfExperience: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        }]
      });
    });

    describe('update', () => {
      it('deve atualizar cheef', async() => {
        const result = [{
        id: 1,
        name: 'chef',
        bio: 'bio',
        role: 'função',
        image:'urldaimagem',
        yearsOfExperience: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        }]
      });
    });

    describe('remove', () => {
      it('deve remover chef', async() => {
        const result = [{
        id: 1,
        name: 'chef',
        bio: 'bio',
        role: 'função',
        image:'urldaimagem',
        yearsOfExperience: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        }]
      });
    });
});
