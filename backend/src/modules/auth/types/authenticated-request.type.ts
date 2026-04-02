import { AuthenticatedUser } from './authenticated-user.type';

export type AuthenticatedRequest = Request & { user: AuthenticatedUser };
