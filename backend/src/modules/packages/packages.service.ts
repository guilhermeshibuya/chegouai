import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {}

  async findByResident(residentId: string | null) {
    if (!residentId) return [];

    return await this.packagesRepository.find({
      where: { resident: { id: residentId } },
      order: { createdAt: 'DESC' },
    });
  }
}
