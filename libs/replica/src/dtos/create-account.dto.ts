import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountCustomDto } from './create-accountcustom.dto';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { isValid, parseISO } from 'date-fns';

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
  phone_office?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => CreateAccountCustomDto)
  custom?: CreateAccountCustomDto;
}