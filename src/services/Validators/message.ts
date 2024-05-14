import { TValidationResult } from './type';

export const message = (_value: string): TValidationResult => {
  const value = _value.trim();

  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }

  return {
    isValid: true,
  };
};
