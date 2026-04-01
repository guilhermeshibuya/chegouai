import { NotFoundException } from '@nestjs/common';

export class ResidentExceptions {
  static residentNotFound() {
    return new NotFoundException('Resident not found');
  }
}
