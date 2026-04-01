import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { CondominiumsModule } from '../condominiums/condominiums.module';
import { ResidentsModule } from '../residents/residents.module';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UsersModule,
    CondominiumsModule,
    ResidentsModule,
    PasswordModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
