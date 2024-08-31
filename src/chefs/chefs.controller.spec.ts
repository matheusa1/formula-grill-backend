import { Test, TestingModule } from '@nestjs/testing';
import { ChefsController } from './chefs.controller';
import { ChefsService } from './chefs.service';

describe('ChefsController', () => {
  let controller: ChefsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChefsController],
      providers: [ChefsService],
    }).compile();

    controller = module.get<ChefsController>(ChefsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
