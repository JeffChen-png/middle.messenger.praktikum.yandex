import { BaseAPI } from '../../services/BaseApiClient';
import { ApiError, HTTPTransport } from '../../services/HTTPClient';
import {
  ChangeProfileAvatarRequest,
  ChangeProfileAvatarResponse,
  ChangeProfilePasswordRequest,
  ChangeProfilePasswordResponse,
  ChangeProfileRequest,
  ChangeProfileResponse,
  GetUserRequest,
  GetUserResponse,
  SearchRequest,
  SearchResponse,
} from './type';

const userAPIInstance = new HTTPTransport('/user');

export class UserApi extends BaseAPI {
  request({ id, ...data }: GetUserRequest): Promise<GetUserResponse | ApiError> {
    return userAPIInstance.get(`/${id}`, { data });
  }

  changeProfile(data: ChangeProfileRequest): Promise<ChangeProfileResponse | ApiError> {
    return userAPIInstance.put('/profile', { data });
  }

  changePassword(data: ChangeProfilePasswordRequest): Promise<ChangeProfilePasswordResponse | ApiError> {
    return userAPIInstance.put('/password', { data });
  }

  changeAvatar(data: ChangeProfileAvatarRequest): Promise<ChangeProfileAvatarResponse | ApiError> {
    const form = new FormData();
    form.append('avatar', data.avatar);

    return userAPIInstance.put('/profile/avatar', { data: form });
  }

  search(data: SearchRequest): Promise<SearchResponse | ApiError> {
    return userAPIInstance.post('/search', { data });
  }
}
