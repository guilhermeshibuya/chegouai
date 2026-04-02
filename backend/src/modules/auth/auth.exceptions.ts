import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthExceptions {
  static emailAlreadyInUse() {
    return new BadRequestException('Email already in use');
  }

  static invalidCredentials() {
    return new UnauthorizedException('Invalid email or password');
  }

  static condominiumNotFound() {
    return new NotFoundException('Condominium not found');
  }

  static userUnauthorized() {
    return new UnauthorizedException('User not authorized');
  }

  static forbidden() {
    return new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }
}
