import { PartialType } from '@nestjs/swagger';
import { CreateVisaDocumentDto } from './create-visadocument.dto';

export class UpdateVisaDocumentDto extends PartialType(CreateVisaDocumentDto) {}