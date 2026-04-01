import { CommonValidations } from './common.validations';

export const PhoneValidations = {
  isString: CommonValidations.isString('Phone'),
  minLength: CommonValidations.minLength('Phone', 10),
  maxLength: CommonValidations.maxLength('Phone', 11),
  notEmpty: CommonValidations.notEmpty('Phone'),
  onlyNumbers: CommonValidations.onlyNumbers('Phone'),
} as const;
