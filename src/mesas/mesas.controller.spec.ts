import { Test, TestingModule } from '@nestjs/testing';
import { MesasController } from './mesas.controller';
import { MesasService } from './mesas.service';

describe('MesasController', () => {
  let controller: MesasController;
  let service: MesasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesasController],
      providers:  [
        {
          provide: MesasService,
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

    controller = module.get<MesasController>(MesasController);
    service = module.get<MesasService>(MesasService); 
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesasController],
      providers: [MesasService],
    }).compile();

    controller = module.get<MesasController>(MesasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
