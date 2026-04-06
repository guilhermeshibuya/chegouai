import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { CondominiumsModule } from '../condominiums/condominiums.module';
import { ResidentsModule } from '../residents/residents.module';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../token/token.module';
import { StaffModule } from '../staff/staff.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    CondominiumsModule,
    ResidentsModule,
    PasswordModule,
    TokenModule,
    StaffModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
