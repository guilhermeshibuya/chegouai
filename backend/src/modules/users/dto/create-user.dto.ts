import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { CommonValidations } from 'src/common/validations/common.validations';
import { NameValidations } from 'src/common/validations/name.validations';

export class CreateUserDto {
  @IsString({ message: NameValidations.isString })
  @MinLength(2, {
    message: NameValidations.minLength,
  })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: NameValidations.onlyLettersAndSpaces,
  })
  name: string;

  @IsEmail({}, { message: CommonValidations.invalidFormat('Email') })
  email: string;

  @IsString({ message: CommonValidations.isString('Password') })
  @MinLength(6, {
    message: CommonValidations.minLength('Password', 6),
  })
  password: string;
}
