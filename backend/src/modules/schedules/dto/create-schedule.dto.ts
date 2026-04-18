import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateScheduleDto {
  @IsString({ message: 'From must be a string' })
  @IsNotEmpty({ message: 'From is required' })
  @MaxLength(100, { message: 'From cannot exceed 100 characters' })
  @Transform(({ value }) => value.trim())
  from: string;

  @IsString({ message: 'To must be a string' })
  @IsNotEmpty({ message: 'To is required' })
  @MaxLength(100, { message: 'To cannot exceed 100 characters' })
  @Transform(({ value }) => value.trim())
  to: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Date is required' })
  date: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Price is required' })
  price: number;
}
