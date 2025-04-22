import { Test, TestingModule } from '@nestjs/testing';
import { CoreDbService } from './db.service';

describe('CoreDbService', () => {
  let service: CoreDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreDbService],
    }).compile();

    service = module.get<CoreDbService>(CoreDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
