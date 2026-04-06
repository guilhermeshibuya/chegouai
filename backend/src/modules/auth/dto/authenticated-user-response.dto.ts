import { Role } from '../enums/role.enum';

export class AuthenticatedUserResponseDto {
  id: string;
  email: string;
  name: string;
  role: Role;
  residentId: string | null;
  condominiumId: string | null;
  staffId: string | null;
}
