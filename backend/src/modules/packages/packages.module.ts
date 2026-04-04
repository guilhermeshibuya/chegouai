import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
