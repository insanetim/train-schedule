import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateScheduleDto {
  @IsString({ message: 'From must be a string' })
  @IsOptional()
  @MinLength(5, { message: 'From must be at least 5 characters long' })
  @MaxLength(100, { message: 'From cannot exceed 100 characters' })
  @Transform(({ value }) => value?.trim())
  from?: string;

  @IsString({ message: 'To must be a string' })
  @IsOptional()
  @MinLength(5, { message: 'To must be at least 5 characters long' })
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
