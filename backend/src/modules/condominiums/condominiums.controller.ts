import { Body, Controller, Post } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CreateCondominiumDto } from './dto/create-condo.dto';

@Controller('condominiums')
export class CondominiumsController {
  constructor(private condominiumsService: CondominiumsService) {}

  @Post()
  async create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumsService.create(createCondominiumDto);
  }
}
