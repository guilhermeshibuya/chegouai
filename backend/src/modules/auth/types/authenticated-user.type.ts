import { Role } from '../enums/role.enum';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  condominiumId: string | null;
  staffId: string | null;
}
