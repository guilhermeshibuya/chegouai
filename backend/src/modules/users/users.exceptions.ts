import { NotFoundException } from '@nestjs/common';

export class UserExceptions {
  static userNotFound() {
    return new NotFoundException('User not found');
  }
}
