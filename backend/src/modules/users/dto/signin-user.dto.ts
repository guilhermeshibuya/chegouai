import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AuthValidationErrors } from 'src/common/constants/validation-messages';

export class SignInUserDto {
  @IsEmail({}, { message: AuthValidationErrors.INVALID_EMAIL })
  email: string;

  @IsString({ message: AuthValidationErrors.PASSWORD_IS_STRING })
  @IsNotEmpty({ message: AuthValidationErrors.PASSWORD_NOT_EMPTY })
  password: string;
}
