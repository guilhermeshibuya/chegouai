import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { CreateUserResidentDto } from '../users/dto/create-user-resident.dto';
import { Public } from './decorators/public.decorator';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/auth-response.dto';
import { CreateUserCondoAdminDto } from '../users/dto/create-user-condo-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiCreatedResponse({
    description: 'User registration successful',
    type: CreateUserResidentDto,
  })
  async register(@Body() createUserResidentDto: CreateUserResidentDto) {
    return this.authService.register(createUserResidentDto);
  }

  @Public()
  @Post('register/admin')
  async registerCondominiumAdmin(
    @Body() createCondoAdminDto: CreateUserCondoAdminDto,
  ) {
    return this.authService.registerCondominiumAdmin(createCondoAdminDto);
  }

  @Public()
  @Post('signin')
  @ApiOkResponse({
    description: 'User sign-in successful',
    type: SignInResponseDto,
  })
  async signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }
}
