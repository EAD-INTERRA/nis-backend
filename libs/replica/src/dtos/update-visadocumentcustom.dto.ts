import { PartialType } from '@nestjs/swagger';
import { CreateVisaDocumentCustomDto } from './create-visadocumentcustom.dto';

export class UpdateVisaDocumentCustomDto extends PartialType(CreateVisaDocumentCustomDto) {}