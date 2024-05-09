import { TValidationResult } from './type';

export const message = (value: string): TValidationResult => {
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
