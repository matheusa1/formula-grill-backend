import { Test, TestingModule } from '@nestjs/testing';
import { PratoController } from './prato.controller';
import { PratoService } from './prato.service';

describe('MesasController', () => {
  let controller: PratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PratoController],
      providers: [PratoService],
    }).compile();

    controller = module.get<PratoController>(PratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
