import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { CondominiumsModule } from './modules/condominiums/condominiums.module';
import { StaffModule } from './modules/staff/staff.module';
import { ResidentsModule } from './modules/residents/residents.module';
import { PackagesModule } from './modules/packages/packages.module';
import { PickupsModule } from './modules/pickups/pickups.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        useUTC: true,
        synchronize: false,
      }),
    }),

    UsersModule,

    CondominiumsModule,

    StaffModule,

    ResidentsModule,

    PackagesModule,

    PickupsModule,

    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
