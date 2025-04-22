import { Test, TestingModule } from '@nestjs/testing';
import { ReplicaDbService } from './replica.service';

describe('ReplicaService', () => {
  let service: ReplicaDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicaDbService],
    }).compile();

    service = module.get<ReplicaDbService>(ReplicaDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
