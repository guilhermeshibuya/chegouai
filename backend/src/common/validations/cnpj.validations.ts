import { CommonValidations } from './common.validations';

export const CnpjValidations = {
  isString: CommonValidations.isString('CNPJ'),
  length: CommonValidations.length('CNPJ', 14),
} as const;
