import { CommonValidations } from './common.validations';

export const CpfValidations = {
  isString: CommonValidations.isString('CPF'),
  length: CommonValidations.length('CPF', 11),
  invalidFormat: CommonValidations.invalidFormat('CPF'),
  notEmpty: CommonValidations.notEmpty('CPF'),
} as const;
