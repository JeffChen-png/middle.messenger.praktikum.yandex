import { BaseAPI } from '../../services/BaseApiClient';
import { ApiError, HTTPTransport } from '../../services/HTTPClient';
import { SignInResponse, SignUpRequest, SignUpResponse, SingInRequest } from './type';

const authAPIInstance = new HTTPTransport('/auth');

export class AuthApi extends BaseAPI {
  signIn(data: SingInRequest): Promise<SignInResponse | ApiError> {
    return authAPIInstance.post('/signin', { data });
  }

  signUp(data: SignUpRequest): Promise<SignUpResponse | ApiError> {
    return authAPIInstance.get('/signup', { data });
  }

  // user
  // logout
}
