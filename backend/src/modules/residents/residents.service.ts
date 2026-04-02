import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';
import { Repository } from 'typeorm';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { CreateResidentDto } from './dto/create-resident.dto';
import { Condominium } from '../condominiums/entities/condominium.entity';
import { ResidentExceptions } from './residents.exceptions';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private residentsRepository: Repository<Resident>,
  ) {}

  async findResidentByCondominium({
    cpf,
    condominiumId,
    apartment,
  }: {
    cpf: string;
    condominiumId: string;
    apartment: string;
  }) {
    return this.residentsRepository.findOne({
      where: {
        cpf,
        condominium: { id: condominiumId },
        apartment,
      },
    });
  }

  async create(createResidentDto: CreateResidentDto) {
    const resident = this.residentsRepository.create({
      ...createResidentDto,
      condominium: { id: createResidentDto.condominiumId },
      user: { id: createResidentDto.userId },
    });
    return this.residentsRepository.save(resident);
  }

  async update(residentId: string, updateResidentDto: UpdateResidentDto) {
    const resident = await this.residentsRepository.findOneBy({
      id: residentId,
    });
    if (!resident) throw ResidentExceptions.residentNotFound();

    Object.assign(resident, updateResidentDto);

    if (updateResidentDto.condominiumId) {
      resident.condominium = {
        id: updateResidentDto.condominiumId,
      } as Condominium;
    }

    if (updateResidentDto.userId) {
      resident.user = {
        id: updateResidentDto.userId,
      } as User;
    }

    return this.residentsRepository.save(resident);
  }
}
