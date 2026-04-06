import { IsOptional, IsString } from 'class-validator';
import { NameValidations } from 'src/common/validations/name.validations';

export class GetResidentsFilterDto {
  @IsOptional()
  @IsString({ message: NameValidations.isString })
  name?: string;

  @IsOptional()
  apartment?: string;
}
