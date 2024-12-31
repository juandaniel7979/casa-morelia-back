import { Test, TestingModule } from '@nestjs/testing';
import { AdicionesService } from './adiciones.service';

describe('AdicionesService', () => {
  let service: AdicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdicionesService],
    }).compile();

    service = module.get<AdicionesService>(AdicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
