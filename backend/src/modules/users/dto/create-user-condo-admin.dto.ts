import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpf } from 'src/common/decorators/is-cpf.decorator';
import { ONLY_NUMBERS_REGEX } from 'src/common/regex/only-numbers';
import { OnlyNumbers } from 'src/common/transformers/only-numbers.transform';
import { CommonValidations } from 'src/common/validations/common.validations';
import { CpfValidations } from 'src/common/validations/cpf.validations';
import { PhoneValidations } from 'src/common/validations/phone.validations';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateUserCondoAdminDto extends CreateUserDto {
  @IsString({ message: CommonValidations.isString('adminToken') })
  @IsNotEmpty({ message: CommonValidations.notEmpty('adminToken') })
  adminToken: string;

  @OnlyNumbers()
  @IsNotEmpty({ message: CpfValidations.notEmpty })
  @Length(11, 11, { message: CpfValidations.length })
  @IsCpf({ message: CpfValidations.invalidFormat })
  cpf: string;

  @OnlyNumbers()
  @IsString({ message: PhoneValidations.isString })
  @IsNotEmpty({ message: PhoneValidations.notEmpty })
  @MinLength(10, {
    message: PhoneValidations.minLength,
  })
  @MaxLength(11, {
    message: PhoneValidations.maxLength,
  })
  @Matches(ONLY_NUMBERS_REGEX, {
    message: PhoneValidations.onlyNumbers,
  })
  phone: string;
}
