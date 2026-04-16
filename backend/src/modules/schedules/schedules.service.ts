import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateScheduleDto, QuerySchedulesDto, UpdateScheduleDto } from './dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new schedule
   * @param data - Schedule creation data
   * @returns Created schedule
   */
  create(data: CreateScheduleDto) {
    return this.prisma.schedule.create({ data });
  }

  /**
   * Find schedule by ID
   * @param id - Schedule UUID
   * @returns Schedule data or null
   */
  findOne(id: string) {
    return this.prisma.schedule.findUnique({ where: { id } });
  }

  /**
   * Get all schedules with filtering, sorting, and pagination
   * By default shows schedules from today onwards
   * Supports location filtering and multiple sort options
   * @param query - Query parameters for filtering and pagination
   * @returns Object with data array and total count
   */
  async findAll(query: QuerySchedulesDto) {
    const { from, to, date, sort, page = 1, limit = 10 } = query;

    // Set today's date at midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const where = {
      // Case-insensitive location filtering
      from: from ? { contains: from, mode: 'insensitive' as const } : undefined,
      to: to ? { contains: to, mode: 'insensitive' as const } : undefined,
      // Date filtering: date range if specified, otherwise from today onwards
      date: date
        ? {
            gte: new Date(date),
            lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000), // Next day
          }
        : { gte: today },
    };

    // Execute data query and count query in parallel for performance
    const [data, total] = await Promise.all([
      this.prisma.schedule.findMany({
        where,
        orderBy:
          sort === 'price_asc'
            ? { price: 'asc' }
            : sort === 'price_desc'
              ? { price: 'desc' }
              : sort === 'date_asc'
                ? { date: 'asc' }
                : sort === 'date_desc'
                  ? { date: 'desc' }
                  : { date: 'asc' }, // Default sort by date ascending
        skip: (page - 1) * limit, // Pagination offset
        take: limit, // Items per page
      }),
      this.prisma.schedule.count({ where }), // Total count for pagination
    ]);

    return { data, total };
  }

  /**
   * Update schedule partially
   * Only updates fields that are provided in the data
   * @param id - Schedule UUID
   * @param data - Partial update data
   * @returns Updated schedule
   */
  update(id: string, data: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete schedule
   * Permanently removes schedule from database
   * @param id - Schedule UUID
   * @returns Deleted schedule
   */
  delete(id: string) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
