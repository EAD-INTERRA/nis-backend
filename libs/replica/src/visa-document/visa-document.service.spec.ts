import { Test, TestingModule } from '@nestjs/testing';
import { VisaDocumentService } from './visa-document.service';

describe('VisaDocumentService', () => {
  let service: VisaDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaDocumentService],
    }).compile();

    service = module.get<VisaDocumentService>(VisaDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
