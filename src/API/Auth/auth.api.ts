import { BaseAPI } from '../../services/BaseApiClient';
import { ApiError, HTTPTransport } from '../../services/HTTPClient';
import { LogOutResponse, SignInResponse, SignUpRequest, SignUpResponse, SingInRequest, UserResponse } from './type';

const authAPIInstance = new HTTPTransport('/auth');

export class AuthApi extends BaseAPI {
  signIn(data: SingInRequest): Promise<SignInResponse | ApiError> {
    return authAPIInstance.post('/signin', { data });
  }

  signUp(data: SignUpRequest): Promise<SignUpResponse | ApiError> {
    return authAPIInstance.post('/signup', { data });
  }

  request(): Promise<UserResponse | ApiError> {
    return authAPIInstance.get('/user');
  }

  logOut(): Promise<LogOutResponse | ApiError> {
    return authAPIInstance.post('/logout');
  }
}
