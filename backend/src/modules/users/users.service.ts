import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { UserStatus } from './enums/user.enum';
import { ResidentStatus } from '../residents/enums/resident.enum';
import { UserExceptions } from './users.exceptions';

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
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async approveUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw UserExceptions.userNotFound();

    user.status = UserStatus.ACTIVE;
    user.resident.status = ResidentStatus.ACTIVE;

    return this.usersRepository.save(user);
  }
}
