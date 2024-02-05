import {
  ChangeProfileAvatarRequest,
  ChangeProfilePasswordRequest,
  ChangeProfileRequest,
  SearchRequest,
  SearchResponse,
  UserApi,
} from '../../API/Users';
import { pathnames, router } from '../../services/Router';
import { initState } from '../../services/Store';
import { apiHasError, getApiError } from '../../utils';
import { getMe } from '../Auth/auth.controller';

const userApi = new UserApi();

export const searchUsers = async (data: SearchRequest): Promise<SearchResponse | undefined> => {
  try {
    const responce = await userApi.search(data);

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      return responce;
    }
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const changeUser = async (data: ChangeProfileRequest) => {
  try {
    await userApi.changeProfile(data);
  } catch (error) {
    throw new Error(getApiError(error));
  }

  getMe();
};

export const changePassword = async (data: ChangeProfilePasswordRequest) => {
  try {
    await userApi.changePassword(data);
  } catch (error) {
    throw new Error(getApiError(error));
  }

  window.store.set({ me: undefined, chats: initState.chats });
  router.go(pathnames.signIn);
};

export const changeAvatar = async (data: ChangeProfileAvatarRequest) => {
  try {
    await userApi.changeAvatar(data);
  } catch (error) {
    throw new Error(getApiError(error));
  }

  getMe();
};
