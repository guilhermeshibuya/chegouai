import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../password/password.service';
import { ResidentsService } from '../residents/residents.service';
import { CondominiumsService } from '../condominiums/condominiums.service';
import { StaffService } from '../staff/staff.service';
import { TokenService } from '../token/token.service';
import { UserStatus } from '../users/enums/user.enum';
import { User } from '../users/entities/user.entity';
import { Condominium } from '../condominiums/entities/condominium.entity';
import { Resident } from '../residents/entities/resident.entity';

describe('AuthService', () => {
  let service: AuthService;

  let usersService: jest.Mocked<UsersService>;
  let passwordService: jest.Mocked<PasswordService>;
  let residentsService: jest.Mocked<ResidentsService>;
  let condominiumsService: jest.Mocked<CondominiumsService>;
  let staffService: jest.Mocked<StaffService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            createWithStatus: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: ResidentsService,
          useValue: {
            findResidentByCondominium: jest.fn(),
            create: jest.fn(),
            linkUser: jest.fn(),
          },
        },
        {
          provide: CondominiumsService,
          useValue: {
            findOneByField: jest.fn(),
          },
        },
        {
          provide: StaffService,
          useValue: {},
        },
        {
          provide: TokenService,
          useValue: {
            generateAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    usersService = module.get<UsersService>(UsersService);
    passwordService = module.get<PasswordService>(PasswordService);
    residentsService = module.get<ResidentsService>(ResidentsService);
    condominiumsService = module.get<CondominiumsService>(CondominiumsService);
    staffService = module.get<StaffService>(StaffService);
    tokenService = module.get<TokenService>(TokenService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return token on successful signin', async () => {
    const userMock: Partial<User> = {
      id: '1',
      email: 'test@example.com',
      password: 'hashed',
      status: UserStatus.ACTIVE,
    };

    usersService.findOneByEmail.mockResolvedValue(userMock as User);
    passwordService.compare.mockResolvedValue(true);
    tokenService.generateAccessToken.mockResolvedValue('token');

    const result = await service.signin({
      email: 'test@example.com',
      password: '123456',
    });

    expect(result).toEqual({
      access_token: 'token',
    });

    expect(usersService.findOneByEmail.mock.calls).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(passwordService.compare.mock.calls).toHaveBeenCalledWith(
      '123456',
      'hashed',
    );
    expect(tokenService.generateAccessToken.mock.calls).toHaveBeenCalledWith({
      sub: '1',
      email: 'test@example.com',
    });
  });

  it('should throw error if user not found on signin', async () => {
    usersService.findOneByEmail.mockResolvedValue(null);

    await expect({
      email: 'nonexistent@example.com',
      password: '123456',
    }).rejects.toThrow();
  });

  it('should throw error if password is incorrect on signin', async () => {
    const userMock: Partial<User> = {
      id: '1',
      email: 'test@example.com',
      password: 'hashed',
      status: UserStatus.ACTIVE,
    };

    usersService.findOneByEmail.mockResolvedValue(userMock as User);
    passwordService.compare.mockResolvedValue(false);

    await expect(
      service.signin({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow();
  });

  it('should throw error if user is inactive on signin', async () => {
    const userMock: Partial<User> = {
      id: '1',
      email: 'test@example.com',
      password: 'hashed',
      status: UserStatus.INACTIVE,
    };

    usersService.findOneByEmail.mockResolvedValue(userMock as User);
    passwordService.compare.mockResolvedValue(true);

    await expect(
      service.signin({
        email: 'test@example.com',
        password: '123456',
      }),
    ).rejects.toThrow();
  });

  it('should register a new user and create a corresponding resident profile', async () => {
    const dto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      cpf: '12345678900',
      phone: '1234567890',
      condominiumCode: 'CONDO123',
      apartment: '101',
    };
    const userMock: Partial<User> = {
      id: '1',
    };
    const residentMock: Partial<Resident> = {
      id: 'resident1',
    };
    const condominiumMock: Partial<Condominium> = {
      id: 'condo1',
    };

    usersService.findOneByEmail.mockResolvedValue(null);
    condominiumsService.findOneByField.mockResolvedValue(
      condominiumMock as Condominium,
    );
    passwordService.hash.mockResolvedValue('hashed');
    usersService.createWithStatus.mockResolvedValue(userMock as User);
    residentsService.findResidentByCondominium.mockResolvedValue(null);
    residentsService.create.mockResolvedValue(residentMock as Resident);

    const result = await service.register(dto);

    expect(result).toEqual({
      user: userMock,
      resident: residentMock,
    });
  });
});
