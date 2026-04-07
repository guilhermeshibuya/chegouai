import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './enums/user.enum';
import { UserExceptions } from './users.exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async createWithStatus(user: CreateUserDto, status: UserStatus) {
    const newUser = this.usersRepository.create({ ...user, status });
    return await this.usersRepository.save(newUser);
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['resident', 'resident.condominium'],
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async activateUser(userId: string) {
    const result = await this.usersRepository.update(
      { id: userId },
      { status: UserStatus.ACTIVE },
    );
    if (result.affected === 0) throw UserExceptions.userNotFound();

    return await this.usersRepository.findOneBy({ id: userId });
  }
}
