import { PartialType } from '@nestjs/swagger';
import { CreateAccountCustomDto } from './create-accountcustom.dto';

export class UpdateAccountCustomDto extends PartialType(CreateAccountCustomDto) {}