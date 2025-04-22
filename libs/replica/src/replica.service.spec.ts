import { Test, TestingModule } from '@nestjs/testing';
import { ReplicaService } from './replica.service';

describe('ReplicaService', () => {
  let service: ReplicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicaService],
    }).compile();

    service = module.get<ReplicaService>(ReplicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
