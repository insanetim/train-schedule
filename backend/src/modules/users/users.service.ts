import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find user by ID
   * Returns user without password
   * @param id - User UUID
   * @returns User data without password
   */
  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  /**
   * Find user by email
   * Used for authentication and validation
   * Returns user with password for verification
   * @param email - User email
   * @returns User data with password
   */
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Create new user
   * Stores user with hashed password
   * Password should be hashed before calling this method
   * @param email - User email
   * @param password - Hashed password
   * @returns Created user data
   */
  create(email: string, password: string) {
    return this.prisma.user.create({
      data: { email, password },
    });
  }
}
