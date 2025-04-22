import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  alias?: string;
  @ApiProperty({ required: false })
  subject?: string;
  @ApiProperty({ required: false })
  modified_user_id?: string;
  @ApiProperty()
  date_modified: string;
  @ApiProperty({ required: false })
  created_by?: string;
  @ApiProperty({ required: false })
  assigned_user_id?: string;
  @ApiProperty({ required: false })
  case_number?: string;
  @ApiProperty({ required: false })
  account_id?: string;
  @ApiProperty()
  type: string;
  @ApiProperty({ required: false })
  custom?: any;
}