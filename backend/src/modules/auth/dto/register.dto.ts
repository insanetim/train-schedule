import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @Transform(({ value }) => value.trim())
  password: string;
}
