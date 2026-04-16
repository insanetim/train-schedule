import { CurrentUser } from '@common/decorators/current-user.decorator';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@CurrentUser() user: { userId: string; email: string }) {
    return this.usersService.findById(user.userId);
  }
}
