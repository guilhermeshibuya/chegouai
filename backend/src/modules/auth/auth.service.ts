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
import { CreateUserCondoAdminDto } from '../users/dto/create-user-condo-admin.dto';
import { Condominium } from '../condominiums/entities/condominium.entity';
import { StaffService } from '../staff/staff.service';
import { UserStatus } from '../users/enums/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private residentsService: ResidentsService,
    private condominiumsService: CondominiumsService,
    private staffService: StaffService,
    private tokenService: TokenService,
  ) {}

  private normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  private async validateEmailAvailable(email: string): Promise<void> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) throw AuthExceptions.emailAlreadyInUse();
  }

  private async validateCondominiumExists(
    field: keyof Condominium,
    value: string,
  ) {
    const condominium = await this.condominiumsService.findOneByField(
      field,
      value,
    );
    if (!condominium) throw AuthExceptions.condominiumNotFound();

    return condominium;
  }

  private async createUser(
    userDto: CreateUserDto,
    email: string,
    status: UserStatus = UserStatus.PENDING,
  ) {
    const hashedPassword = await this.passwordService.hash(userDto.password);

    const user = await this.usersService.createWithStatus(
      {
        name: userDto.name,
        email: email,
        password: hashedPassword,
      },
      status,
    );

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

    if (!existingResident) return this.residentsService.create(residentData);

    if (existingResident.user) throw AuthExceptions.residentAlreadyLinked();

    return this.residentsService.linkUser(existingResident.id, userId);
  }

  async register(
    dto: CreateUserResidentDto,
  ): Promise<{ user: User; resident: Resident }> {
    const email = this.normalizeEmail(dto.email);

    await this.validateEmailAvailable(email);
    const condominium = await this.validateCondominiumExists(
      'code',
      dto.condominiumCode,
    );

    const user = await this.createUser(dto, email);
    const resident = await this.upsertResident(dto, user.id, condominium.id);

    return { user, resident };
  }

  async registerCondominiumAdmin(dto: CreateUserCondoAdminDto) {
    const email = this.normalizeEmail(dto.email);

    await this.validateEmailAvailable(email);
    const condominium = await this.validateCondominiumExists(
      'adminToken',
      dto.adminToken,
    );
    const existingAdmin = await this.staffService.findCondoAdminByCondominiumId(
      condominium.id,
    );

    if (existingAdmin) throw AuthExceptions.condoAdminAlreadyExists();

    const user = await this.createUser(dto, email, UserStatus.ACTIVE);

    const staff = await this.staffService.createCondoAdmin({
      userId: user.id,
      condominiumId: condominium.id,
      cpf: dto.cpf,
      phone: dto.phone,
    });

    return { user, staff };
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
