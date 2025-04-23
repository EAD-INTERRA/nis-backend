import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountCustomDto } from './create-accountcustom.dto';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  alias?: string;

  @ApiProperty({ required: false })
  surname?: string;

  @ApiProperty()
  date_modified: string;

  @ApiProperty({ required: false })
  phone_office?: string;
  
  @ApiProperty({ required: false })
  @Type(() => CreateAccountCustomDto)
  custom?: CreateAccountCustomDto;
}