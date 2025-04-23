import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountCustomDto } from './create-accountcustom.dto';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  alias?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  surname?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  date_modified: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phone_office?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => CreateAccountCustomDto)
  custom?: CreateAccountCustomDto;
}