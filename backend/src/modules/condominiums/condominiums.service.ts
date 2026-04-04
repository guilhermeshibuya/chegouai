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

  generateCondominiumCode(): string {
    const LENGTH = 6;

    return nanoid(LENGTH).toUpperCase();
  }

  async findAll() {
    return await this.condominiumsRepository.find();
  }

  async findOneByCode(code: string) {
    return await this.condominiumsRepository.findOneBy({ code });
  }

  async create(createCondominiumDto: CreateCondominiumDto) {
    const { name, cnpj } = createCondominiumDto;

    let isUnique = false;
    let code = '';

    while (!isUnique) {
      code = this.generateCondominiumCode();

      const existingCondo = await this.condominiumsRepository.findOneBy({
        code,
      });

      if (!existingCondo) isUnique = true;
    }

    const newCondo = this.condominiumsRepository.create({
      name,
      cnpj,
      code,
    });

    return await this.condominiumsRepository.save(newCondo);
  }
}
