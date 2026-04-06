import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { CreateResidentDto } from './dto/create-resident.dto';
import { Condominium } from '../condominiums/entities/condominium.entity';
import { ResidentExceptions } from './residents.exceptions';
import { User } from '../users/entities/user.entity';
import { GetResidentsFilterDto } from './dto/get-residents-filter.dto';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private residentsRepository: Repository<Resident>,
  ) {}

  async findAll() {
    return await this.residentsRepository.find();
  }

  async findByCondominiumFilter(
    condominiumId: string,
    filterDto: GetResidentsFilterDto,
  ) {
    const { name, apartment } = filterDto;

    return await this.residentsRepository.find({
      where: {
        ...(name && { name: ILike(`${name}%`) }),
        ...(apartment && { apartment: ILike(`${apartment}%`) }),
        condominium: { id: condominiumId },
      },
    });
  }

  async findResidentByCondominium({
    cpf,
    condominiumId,
    apartment,
  }: {
    cpf: string;
    condominiumId: string;
    apartment: string;
  }) {
    return await this.residentsRepository.findOne({
      where: {
        cpf,
        condominium: { id: condominiumId },
        apartment,
      },
      relations: ['user'],
    });
  }

  async create(createResidentDto: CreateResidentDto) {
    const resident = this.residentsRepository.create({
      ...createResidentDto,
      condominium: { id: createResidentDto.condominiumId },
      user: { id: createResidentDto.userId },
    });
    return await this.residentsRepository.save(resident);
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

    return await this.residentsRepository.save(resident);
  }

  async linkUser(residentId: string, userId: string) {
    const resident = await this.residentsRepository.findOneBy({
      id: residentId,
    });
    if (!resident) throw ResidentExceptions.residentNotFound();

    resident.user = { id: userId } as User;

    return await this.residentsRepository.save(resident);
  }
}
