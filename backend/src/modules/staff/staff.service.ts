import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCondoAdminDto } from './dto/create-condo-admin.dto';
import { StaffRole } from './enums/staff.enum';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async findOneById(id: string) {
    return await this.staffRepository.findOneBy({ id });
  }

  async findOneByUserIdWithCondominium(userId: string) {
    return await this.staffRepository.findOne({
      where: { user: { id: userId } },
      relations: ['condominium'],
    });
  }

  async findCondoAdminByCondominiumId(condominiumId: string) {
    return await this.staffRepository.findOne({
      where: { condominium: { id: condominiumId } },
      relations: ['condominium'],
    });
  }

  async createCondoAdmin(dto: CreateCondoAdminDto) {
    const newAdmin = this.staffRepository.create({
      user: { id: dto.userId },
      condominium: { id: dto.condominiumId },
      role: StaffRole.CONDO_ADMIN,
      cpf: dto.cpf,
      phone: dto.phone,
    });

    return await this.staffRepository.save(newAdmin);
  }
}
