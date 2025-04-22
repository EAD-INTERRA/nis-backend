import { ApiProperty } from '@nestjs/swagger';

export class CreateVisaDocumentDto {
  @ApiProperty()
  date_modified: string;
  @ApiProperty({ required: false })
  modified_user_id?: string;
  @ApiProperty({ required: false })
  created_by?: string;
  @ApiProperty({ required: false })
  assigned_user_id?: string;
  @ApiProperty({ required: false })
  document_name?: string;
  @ApiProperty({ required: false })
  filename?: string;
  @ApiProperty({ required: false })
  file_ext?: string;
  @ApiProperty({ required: false })
  file_mime_type?: string;
  @ApiProperty({ required: false })
  custom?: any;
}