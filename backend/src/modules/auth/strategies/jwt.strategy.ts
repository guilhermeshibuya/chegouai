import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { AuthExceptions } from '../auth.exceptions';
import { Role } from '../enums/role.enum';
import { AuthenticatedUser } from '../types/authenticated-user.type';
import { StaffService } from 'src/modules/staff/staff.service';
import { JwtPayload } from 'src/modules/token/types/jwt-payload.type';
import { StaffRole } from 'src/modules/staff/enums/staff.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private staffService: StaffService,
  ) {
    const secret = process.env.JWT_SECRET;

    if (!secret)
      throw new Error('JWT_SECRET is not defined in environment variables');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.usersService.findOneById(payload.sub.toString());

    if (!user) throw AuthExceptions.userUnauthorized();

    const { id, email, name } = user;

    if (user.isSysAdmin) {
      return {
        id,
        email,
        name,
        role: Role.SYS_ADMIN,
        condominiumId: null,
        staffId: null,
      };
    }

    const staff = await this.staffService.findOneByUserIdWithCondominium(id);

    if (staff) {
      const role =
        staff.role === StaffRole.CONDO_ADMIN
          ? Role.CONDO_ADMIN
          : Role.DOORPERSON;

      return {
        id,
        email,
        name,
        role,
        condominiumId: staff.condominium.id,
        staffId: staff.id,
      };
    }

    return {
      id,
      email,
      name,
      role: Role.RESIDENT,
      condominiumId: user.resident?.condominium?.id ?? null,
      staffId: null,
    };
  }
}
