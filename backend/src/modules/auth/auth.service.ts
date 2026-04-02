import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { CondominiumsService } from '../condominiums/condominiums.service';
import { ResidentsService } from '../residents/residents.service';
import { CreateUserResidentDto } from '../users/dto/create-user-resident.dto';
import { PasswordService } from '../password/password.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { Resident } from '../residents/entities/resident.entity';
import { AuthExceptions } from './auth.exceptions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private residentsService: ResidentsService,
    private condominiumsService: CondominiumsService,
    private tokenService: TokenService,
  ) {}

  private normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  private async validateEmailAvailable(email: string): Promise<void> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) throw AuthExceptions.emailAlreadyInUse();
  }

  private async validateCondominiumExists(code: string) {
    const condominium = await this.condominiumsService.findOneByCode(code);
    if (!condominium) throw AuthExceptions.condominiumNotFound();

    return condominium;
  }

  private async createUser(userDto: CreateUserDto, email: string) {
    const hashedPassword = await this.passwordService.hash(userDto.password);

    const user = await this.usersService.create({
      name: userDto.name,
      email: email,
      password: hashedPassword,
    });

    return user;
  }

  private async upsertResident(
    dto: CreateUserResidentDto,
    userId: string,
    condominiumId: string,
  ) {
    const residentData = { ...dto, condominiumId, userId };
    const existingResident =
      await this.residentsService.findResidentByCondominium({
        cpf: dto.cpf,
        condominiumId,
        apartment: dto.apartment,
      });

    return existingResident
      ? this.residentsService.update(existingResident.id, residentData)
      : this.residentsService.create(residentData);
  }

  async register(
    dto: CreateUserResidentDto,
  ): Promise<{ user: User; resident: Resident }> {
    const email = this.normalizeEmail(dto.email);

    await this.validateEmailAvailable(email);
    const condominium = await this.validateCondominiumExists(
      dto.condominiumCode,
    );
    const user = await this.createUser(dto, email);
    const resident = await this.upsertResident(dto, user.id, condominium.id);

    return { user, resident };
  }

  async signin(
    signInUserDto: SignInUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = signInUserDto;
    const normalizedEmail = this.normalizeEmail(email);

    const user = await this.usersService.findOneByEmail(normalizedEmail);
    if (!user) throw AuthExceptions.invalidCredentials();

    const passwordMatches = await this.passwordService.compare(
      password,
      user.password,
    );
    if (!passwordMatches) throw AuthExceptions.invalidCredentials();

    const token = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }
}
