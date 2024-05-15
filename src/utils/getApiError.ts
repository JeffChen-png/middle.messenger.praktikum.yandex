import { apiHasError } from './apiHasError';

export function getApiError(response: any): string {
  if (apiHasError(response)) {
    return response.reason;
  } else {
    return 'Что-то пошло не так';
  }
}
