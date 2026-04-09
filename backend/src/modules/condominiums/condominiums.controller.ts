import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CreateCondominiumDto } from './dto/create-condo.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { GetResidentsFilterDto } from '../residents/dto/get-residents-filter.dto';
import { ResidentsService } from '../residents/residents.service';

@Controller('condominiums')
export class CondominiumsController {
  constructor(
    private condominiumsService: CondominiumsService,
    private residentsService: ResidentsService,
  ) {}

  @Roles(Role.SYS_ADMIN)
  @Post()
  async create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumsService.create(createCondominiumDto);
  }

  @Roles(Role.SYS_ADMIN)
  @Get(':id/residents')
  async findResidents(
    @Param('id') id: string,
    @Query() filterDto: GetResidentsFilterDto,
  ) {
    return this.residentsService.findByCondominiumFilter(id, filterDto);
  }
}
