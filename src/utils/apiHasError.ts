import { ApiError } from '../services/HTTPClient';

export function apiHasError(response: any): response is ApiError {
  return response?.reason;
}
