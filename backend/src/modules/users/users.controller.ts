import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser() user: { userId: string; email: string }) {
    return this.usersService.findById(user.userId);
  }
}
