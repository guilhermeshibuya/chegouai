import { Module } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CondominiumsController } from './condominiums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condominium } from './entities/condominium.entity';
import { ResidentsModule } from '../residents/residents.module';

@Module({
  imports: [TypeOrmModule.forFeature([Condominium]), ResidentsModule],
  providers: [CondominiumsService],
  controllers: [CondominiumsController],
  exports: [CondominiumsService],
})
export class CondominiumsModule {}
