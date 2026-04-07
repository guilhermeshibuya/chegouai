import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { CpfValidations } from 'src/common/validations/cpf.validations';
import { IsCpf } from 'src/common/decorators/is-cpf.decorator';
import { PhoneValidations } from 'src/common/validations/phone.validations';
import { CommonValidations } from 'src/common/validations/common.validations';
import { OnlyNumbers } from 'src/common/transformers/only-numbers.transform';
import { ONLY_NUMBERS_REGEX } from 'src/common/regex/only-numbers';

export class CreateUserResidentDto extends CreateUserDto {
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

  @IsString({ message: CommonValidations.isString('block') })
  @IsOptional()
  block?: string;

  @IsString({ message: CommonValidations.isString('apartment') })
  apartment: string;

  @IsString({ message: CommonValidations.isString('condominiumCode') })
  condominiumCode: string;
}
