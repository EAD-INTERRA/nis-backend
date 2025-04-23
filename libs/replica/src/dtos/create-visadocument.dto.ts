import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateVisaDocumentCustomDto } from './create-visadocumentcustom.dto';
import { Transform } from 'class-transformer';
import { isValid, parseISO } from 'date-fns';

export class CreateVisaDocumentDto {
  @ApiProperty()
  @IsOptional()
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
  date_modified: string;

  @ApiProperty({ required: false })
  @IsOptional()
  modified_user_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  created_by?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  assigned_user_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  document_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  filename?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  file_ext?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  file_mime_type?: string;
  
  // @ApiProperty({ required: false })
  // @IsOptional()
  // account_id?: string;
  
  // @ApiProperty({ required: false })
  // @IsOptional()
  // passport_number?: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  case_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  custom?: CreateVisaDocumentCustomDto;
}