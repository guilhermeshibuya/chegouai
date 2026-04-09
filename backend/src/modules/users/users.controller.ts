import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedUserResponseDto } from '../auth/dto/authenticated-user-response.dto';
import { Role } from '../auth/enums/role.enum';
import { CondominiumsService } from '../condominiums/condominiums.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly condominiumsService: CondominiumsService,
  ) {}

  @Get('me')
  @ApiOkResponse({
    description: 'Get the currently authenticated user',
    type: AuthenticatedUserResponseDto,
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'fulano@example.com',
      name: 'Fulano de Tal',
      role: Role.RESIDENT,
      residentId: '123e4567-e89b-12d3-a456-426614174000',
      condominiumId: '123e4567-e89b-12d3-a456-426614174000',
      staffId: null,
    },
  })
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @Get('me/condominium')
  getMyCondominium(@CurrentUser() user: AuthenticatedUser) {
    if (!user.condominiumId) return null;
    return this.condominiumsService.findOneByField('id', user.condominiumId);
  }
}
