import { Module } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { ResidentsController } from './residents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resident])],
  providers: [ResidentsService],
  controllers: [ResidentsController],
  exports: [ResidentsService],
})
export class ResidentsModule {}
