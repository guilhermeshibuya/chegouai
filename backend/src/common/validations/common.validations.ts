export const CommonValidations = {
  isString: (field: string) => `${field} must be a string`,
  minLength: (field: string, length: number) =>
    `${field} must be at least ${length} characters long`,
  maxLength: (field: string, length: number) =>
    `${field} must be at most ${length} characters long`,
  length: (field: string, length: number) =>
    `${field} must be exactly ${length} characters long`,
  notEmpty: (field: string) => `${field} should not be empty`,
  invalidFormat: (field: string) => `${field} has an invalid format`,
  onlyLettersAndSpaces: (field: string) =>
    `${field} should contain only letters and spaces`,
  onlyNumbers: (field: string) => `${field} should contain only numbers`,
  isEnum: (field: string) => `${field} must be a valid enum value`,
} as const;
