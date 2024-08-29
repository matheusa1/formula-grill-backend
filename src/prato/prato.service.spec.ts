import { Test, TestingModule } from '@nestjs/testing';
import { PratoService } from './prato.service';

describe('PratoService', () => {
  let service: PratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PratoService],
    }).compile();

    service = module.get<PratoService>(PratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
