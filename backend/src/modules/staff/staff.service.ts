import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async findOneById(id: string) {
    return this.staffRepository.findOneBy({ id });
  }

  async findOneByUserIdWithCondominium(userId: string) {
    return this.staffRepository.findOne({
      where: { user: { id: userId } },
      relations: ['condominium'],
    });
  }
}
