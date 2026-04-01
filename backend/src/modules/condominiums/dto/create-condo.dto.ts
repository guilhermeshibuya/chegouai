import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { CnpjValidations } from 'src/common/validations/cnpj.validations';
import { NameValidations } from 'src/common/validations/name.validations';

export class CreateCondominiumDto {
  @IsString({ message: NameValidations.isString })
  @IsNotEmpty({ message: NameValidations.notEmpty })
  @MinLength(2, { message: NameValidations.minLength })
  name: string;

  @IsString({ message: CnpjValidations.isString })
  @Length(14, 14, { message: CnpjValidations.length })
  cnpj: string;
}
