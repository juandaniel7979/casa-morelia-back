import { Test, TestingModule } from '@nestjs/testing';
import { AdicionesController } from './adiciones.controller';

describe('AdicionesController', () => {
  let controller: AdicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdicionesController],
    }).compile();

    controller = module.get<AdicionesController>(AdicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
