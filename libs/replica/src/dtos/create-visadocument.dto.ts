import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateVisaDocumentCustomDto } from './create-visadocumentcustom.dto';
import { Transform } from 'class-transformer';

export class CreateVisaDocumentDto {
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
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

  @ApiProperty({ required: false })
  @IsOptional()
  custom?: CreateVisaDocumentCustomDto;
}