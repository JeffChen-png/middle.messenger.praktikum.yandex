import { TValidationResult } from './type';

// eslint-disable-next-line unicorn/better-regex
const capitalLetterRegExp = /(?=.*[A-Z])/;
// eslint-disable-next-line unicorn/better-regex
const digitRegExp = /(?=.*[\d])/;

export const password = (value: string): TValidationResult => {
  if (value.length === 0) {
    return {
      isValid: false,
      message: 'Пожалуйста заполните поле',
    };
  }

  const validByCapitalLetter = capitalLetterRegExp.test(value);
  const validByDigitLetter = digitRegExp.test(value);

  if (!validByCapitalLetter) {
    return {
      isValid: false,
      message: 'Пожалуйста введите хотя бы 1 заглавную букву',
    };
  }

  if (!validByDigitLetter) {
    return {
      isValid: false,
      message: 'Пожалуйста введите хотя бы 1 цифру',
    };
  }

  return {
    isValid: true,
  };
};
