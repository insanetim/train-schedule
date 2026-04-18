import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateScheduleDto {
  @IsString({ message: 'From must be a string' })
  @IsOptional()
  @MaxLength(100, { message: 'From cannot exceed 100 characters' })
  @Transform(({ value }) => value?.trim())
  from?: string;

  @IsString({ message: 'To must be a string' })
  @IsOptional()
  @MaxLength(100, { message: 'To cannot exceed 100 characters' })
  @Transform(({ value }) => value?.trim())
  to?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
