import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { AuthValidationErrors } from 'src/common/constants/validation-messages';

export class CreateUserDto {
  @IsString({ message: AuthValidationErrors.NAME_IS_STRING })
  @MinLength(2, {
    message: AuthValidationErrors.NAME_MIN_LENGTH,
  })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: AuthValidationErrors.NAME_ONLY_LETTERS_AND_SPACES,
  })
  name: string;

  @IsEmail({}, { message: AuthValidationErrors.INVALID_EMAIL })
  email: string;

  @IsString({ message: AuthValidationErrors.PASSWORD_IS_STRING })
  @MinLength(6, {
    message: AuthValidationErrors.PASSWORD_MIN_LENGTH,
  })
  password: string;
}
