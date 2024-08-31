import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/prato/prato.service.spec.ts
import { PratoService } from './prato.service';

describe('PratoService', () => {
  let service: PratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PratoService],
    }).compile();

    service = module.get<PratoService>(PratoService);
========
import { MesasService } from './mesas.service';

describe('MesasService', () => {
  let service: MesasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesasService],
    }).compile();

    service = module.get<MesasService>(MesasService);
>>>>>>>> develop:src/mesas/mesas.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
