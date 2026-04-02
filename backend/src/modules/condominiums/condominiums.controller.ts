import { Body, Controller, Post } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CreateCondominiumDto } from './dto/create-condo.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('condominiums')
export class CondominiumsController {
  constructor(private condominiumsService: CondominiumsService) {}

  @Roles(Role.SYS_ADMIN)
  @Post()
  async create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumsService.create(createCondominiumDto);
  }
}
