import { PartialType } from '@nestjs/swagger';
import { CreateCaseCustomDto } from './create-casecustom.dto';

export class UpdateCaseCustomDto extends PartialType(CreateCaseCustomDto) {}