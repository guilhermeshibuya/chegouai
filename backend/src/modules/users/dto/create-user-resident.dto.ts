import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { CpfValidations } from 'src/common/validations/cpf.validations';
import { IsCpf } from 'src/common/decorators/is-cpf.decorator';
import { PhoneValidations } from 'src/common/validations/phone.validations';
import { CommonValidations } from 'src/common/validations/common.validations';

export class CreateUserResidentDto extends CreateUserDto {
  @IsNotEmpty({ message: CpfValidations.notEmpty })
  @IsCpf({ message: CpfValidations.invalidFormat })
  cpf: string;

  @IsString({ message: PhoneValidations.isString })
  @IsNotEmpty({ message: PhoneValidations.notEmpty })
  @MinLength(10, {
    message: PhoneValidations.minLength,
  })
  @MaxLength(11, {
    message: PhoneValidations.maxLength,
  })
  @Matches(/^\d+$/, {
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
