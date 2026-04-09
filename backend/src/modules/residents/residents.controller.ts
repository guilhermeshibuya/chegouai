import { Controller, Get, Param, Query } from '@nestjs/common';
import { PackagesService } from '../packages/packages.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResidentsService } from './residents.service';
import { GetResidentsFilterDto } from './dto/get-residents-filter.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('residents')
export class ResidentsController {
  constructor(
    private packagesService: PackagesService,
    private residentsService: ResidentsService,
  ) {}

  @Get()
  @Roles(Role.SYS_ADMIN, Role.CONDO_ADMIN, Role.DOORPERSON)
  @ApiOkResponse({
    description: 'Get a list of residents with optional filters',
  })
  async getResidents(
    @Query() filter: GetResidentsFilterDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.residentsService.findWithScope(user, filter);
  }

  @Get('me/packages')
  @ApiOkResponse({
    description: 'Get the packages for the currently authenticated resident',
  })
  async getMyPackages(@CurrentUser() user: AuthenticatedUser) {
    return this.packagesService.findByResident(user.residentId);
  }

  @Get(':id/approve')
  @Roles(Role.SYS_ADMIN, Role.CONDO_ADMIN, Role.DOORPERSON)
  @ApiOkResponse()
  async approveResident(@Param('id') residentId: string) {
    await this.residentsService.approve(residentId);
  }
}
