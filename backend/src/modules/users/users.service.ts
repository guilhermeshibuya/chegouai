import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findOneById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['resident', 'resident.condominium'],
    });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
