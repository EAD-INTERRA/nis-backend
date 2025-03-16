import { Test, TestingModule } from '@nestjs/testing';
import { EVisaController } from './e-visa.controller';

describe('EVisaController', () => {
  let controller: EVisaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EVisaController],
    }).compile();

    controller = module.get<EVisaController>(EVisaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
