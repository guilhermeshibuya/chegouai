import { CommonValidations } from './common.validations';

export const NameValidations = {
  isString: CommonValidations.isString('Name'),
  minLength: CommonValidations.minLength('Name', 2),
  notEmpty: CommonValidations.notEmpty('Name'),
  onlyLettersAndSpaces: CommonValidations.onlyLettersAndSpaces('Name'),
} as const;
