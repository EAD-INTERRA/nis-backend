import { Test, TestingModule } from '@nestjs/testing';
import { EVisaService } from './e-visa.service';

describe('EVisaService', () => {
  let service: EVisaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EVisaService],
    }).compile();

    service = module.get<EVisaService>(EVisaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
