import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CommonValidations } from 'src/common/validations/common.validations';
import { OnlyNumbers } from 'src/common/transformers/only-numbers.transform';
import { CpfValidations } from 'src/common/validations/cpf.validations';
import { IsCpf } from 'src/common/decorators/is-cpf.decorator';
import { PhoneValidations } from 'src/common/validations/phone.validations';
import { ONLY_NUMBERS_REGEX } from 'src/common/regex/only-numbers';

export class CreateCondoAdminDto {
  @IsString({ message: CommonValidations.isString('userId') })
  @IsNotEmpty({ message: CommonValidations.notEmpty('userId') })
  userId: string;

  @IsString({ message: CommonValidations.isString('condominiumId') })
  @IsNotEmpty({ message: CommonValidations.notEmpty('condominiumId') })
  condominiumId: string;

  @OnlyNumbers()
  @IsNotEmpty({ message: CpfValidations.notEmpty })
  @Length(11, 11, { message: CpfValidations.length })
  @IsCpf({ message: CpfValidations.invalidFormat })
  cpf: string;

  @OnlyNumbers()
  @IsString({ message: PhoneValidations.isString })
  @MinLength(10, { message: PhoneValidations.minLength })
  @MaxLength(11, { message: PhoneValidations.maxLength })
  @IsNotEmpty({ message: PhoneValidations.notEmpty })
  @Matches(ONLY_NUMBERS_REGEX, { message: PhoneValidations.onlyNumbers })
  phone: string;
}
