import { ApiProperty } from '@nestjs/swagger';
import { CreateCaseCustomDto } from './create-casecustom.dto';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateCaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  alias?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  subject?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  modified_user_id?: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  date_modified: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  created_by?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  assigned_user_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  case_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  account_id?: string;

  @ApiProperty({ required: true })
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @Type(() => CreateCaseCustomDto)
  @IsOptional()
  custom?: CreateCaseCustomDto;
}