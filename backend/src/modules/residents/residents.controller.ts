import { Controller, Get } from '@nestjs/common';
import { PackagesService } from '../packages/packages.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResidentsService } from './residents.service';

@Controller('residents')
export class ResidentsController {
  constructor(
    private packagesService: PackagesService,
    private residentsService: ResidentsService,
  ) {}

  @Get()
  @Roles(Role.SYS_ADMIN)
  async getAllResidents() {
    return this.residentsService.findAll();
  }

  @Get('me/packages')
  async getMyPackages(@CurrentUser() user: AuthenticatedUser) {
    return this.packagesService.findByResident(user.residentId);
  }
}
