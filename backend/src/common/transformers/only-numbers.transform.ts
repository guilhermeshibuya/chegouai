import { Transform } from 'class-transformer';

export function OnlyNumbers() {
  return Transform(({ value }) => {
    const normalizedValue =
      typeof value === 'string'
        ? value.replace(/\D/g, '')
        : typeof value === 'number'
          ? String(value).replace(/\D/g, '')
          : '';

    return normalizedValue;
  });
}
