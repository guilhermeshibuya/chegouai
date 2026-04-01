import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonValidations } from 'src/common/validations/common.validations';

export class SignInUserDto {
  @IsEmail({}, { message: CommonValidations.invalidFormat('Email') })
  email: string;

  @IsString({ message: CommonValidations.isString('Password') })
  @IsNotEmpty({ message: CommonValidations.notEmpty('Password') })
  password: string;
}
