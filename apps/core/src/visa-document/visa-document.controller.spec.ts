import { Test, TestingModule } from '@nestjs/testing';
import { VisaDocumentController } from './visa-document.controller';

describe('VisaDocumentController', () => {
  let controller: VisaDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaDocumentController],
    }).compile();

    controller = module.get<VisaDocumentController>(VisaDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
