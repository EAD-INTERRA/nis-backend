import { ApiProperty } from '@nestjs/swagger';
import { CreateCaseCustomDto } from './create-casecustom.dto';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateVisaDocumentDto } from './create-visadocument.dto';
import { isValid, parseISO } from 'date-fns';

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
  @Transform(({ value }) => {
    let parsed = parseISO(value);
    if (!isValid(parsed)) {
      // Try to fix a "YYYY-MM-DD" format manually
      try {
        const fixed = `${value}T00:00:00.000Z`;
        parsed = new Date(fixed);
      } catch {
        return null;
      }
    }
  
    return isValid(parsed) ? parsed.toISOString() : null;
  })
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

  // @ApiProperty({ required: false })
  // @IsOptional()
  // account_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  passport_number?: string;

  @ApiProperty({ required: true })
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @Type(() => CreateVisaDocumentDto)
  @IsOptional()
  visa_document?: CreateVisaDocumentDto;

  @ApiProperty({ required: false })
  @Type(() => CreateCaseCustomDto)
  @IsOptional()
  custom?: CreateCaseCustomDto;
}