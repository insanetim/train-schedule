import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class QuerySchedulesDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  from?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  to?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsEnum(['price_asc', 'price_desc', 'date_asc', 'date_desc'], {
    message: 'Sort must be one of: price_asc, price_desc, date_asc, date_desc',
  })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  sort?: 'price_asc' | 'price_desc' | 'date_asc' | 'date_desc';

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
