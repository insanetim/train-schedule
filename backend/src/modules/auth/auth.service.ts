import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * Hashes password with bcrypt and creates user account
   * @param dto - Registration data with email and password
   * @returns Created user without password
   */
  async register({ email, password }: RegisterDto) {
    const hash = await bcrypt.hash(password, 10);
    return this.usersService.create(email, hash);
  }

  /**
   * Authenticate user and generate JWT token
   * Validates credentials and returns access token
   * @param dto - Login data with email and password
   * @returns JWT access token
   * @throws UnauthorizedException if credentials are invalid
   */
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
