import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ResidentStatus } from '../enums/resident.enum';
import { NameValidations } from 'src/common/validations/name.validations';
import { CpfValidations } from 'src/common/validations/cpf.validations';
import { PhoneValidations } from 'src/common/validations/phone.validations';
import { IsCpf } from 'src/common/decorators/is-cpf.decorator';
import { CommonValidations } from 'src/common/validations/common.validations';
import { OnlyNumbers } from 'src/common/transformers/only-numbers.transform';

export class CreateResidentDto {
  @IsString({ message: NameValidations.isString })
  @MinLength(2, { message: NameValidations.minLength })
  @IsNotEmpty({ message: NameValidations.notEmpty })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: NameValidations.onlyLettersAndSpaces,
  })
  name: string;

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
  @Matches(/^\d+$/, { message: PhoneValidations.onlyNumbers })
  phone: string;

  @IsString({ message: CommonValidations.isString('apartment') })
  apartment: string;

  @IsString({ message: CommonValidations.isString('block') })
  block?: string;

  @IsEnum(ResidentStatus)
  status?: ResidentStatus;

  @IsUUID()
  condominiumId: string;

  @IsUUID()
  userId?: string;
}
