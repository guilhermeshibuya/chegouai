import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Condominium } from './entities/condominium.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { CreateCondominiumDto } from './dto/create-condo.dto';

@Injectable()
export class CondominiumsService {
  constructor(
    @InjectRepository(Condominium)
    private condominiumsRepository: Repository<Condominium>,
  ) {}

  private async generateUniqueCode(
    field: keyof Condominium,
    length = 6,
  ): Promise<string> {
    let isUnique = false;
    let code = '';

    while (!isUnique) {
      code = nanoid(length).toUpperCase();

      const existing = await this.condominiumsRepository.findOneBy({
        [field]: code,
      });

      if (!existing) isUnique = true;
    }
    return code;
  }

  async findAll() {
    return await this.condominiumsRepository.find();
  }

  // async findOneByCode(code: string) {
  //   return await this.condominiumsRepository.findOneBy({ code });
  // }

  async findOneByField(field: keyof Condominium, value: string) {
    return await this.condominiumsRepository.findOneBy({ [field]: value });
  }

  async create(createCondominiumDto: CreateCondominiumDto) {
    const { name, cnpj } = createCondominiumDto;

    const condominiumCode = await this.generateUniqueCode('code', 6);
    const adminToken = await this.generateUniqueCode('adminToken', 8);

    const newCondo = this.condominiumsRepository.create({
      name,
      cnpj,
      code: condominiumCode,
      adminToken,
    });

    return await this.condominiumsRepository.save(newCondo);
  }
}
