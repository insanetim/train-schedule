import { createPaginatedResponse } from '@common/helpers/pagination.helper';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateScheduleDto, QuerySchedulesDto, UpdateScheduleDto } from './dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  async findAll(@Query() query: QuerySchedulesDto) {
    const { data, total } = await this.schedulesService.findAll(query);
    return createPaginatedResponse(data, query.page, query.limit, total);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.schedulesService.delete(id);
  }
}
