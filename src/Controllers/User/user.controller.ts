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
import * as validators from '../../services/Validators';
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
    console.error(getApiError(error));
  }

  return undefined;
};

const changeUserValidationSchema: Record<keyof ChangeProfileRequest, typeof validators.name | undefined> = {
  first_name: validators.name,
  second_name: validators.name,
  display_name: undefined,
  login: validators.login,
  email: validators.email,
  phone: validators.phone,
};

export const changeUser = async (data: ChangeProfileRequest) => {
  const validatorResult = Object.entries(data).map(([key, value]) => {
    const fieldName = key as keyof ChangeProfileRequest;
    const validator = changeUserValidationSchema[fieldName];

    if (!validator) return true;

    return validator(value).isValid;
  });

  const isValid = !validatorResult.includes(false);

  if (!isValid) return;

  try {
    await userApi.changeProfile(data);
  } catch (error) {
    console.error(getApiError(error));
  }

  getMe();
};

const changePasswordValidationSchema = {
  oldPassword: validators.password,
  newPassword: validators.password,
};

export const changePassword = async (data: ChangeProfilePasswordRequest) => {
  const validatorResult = Object.entries(data).map(([key, value]) => {
    const fieldName = key as keyof ChangeProfilePasswordRequest;
    const validator = changePasswordValidationSchema[fieldName];

    if (!validator) return true;

    return validator(value).isValid;
  });

  const isValid = !validatorResult.includes(false);

  if (!isValid) return;

  try {
    await userApi.changePassword(data);
  } catch (error) {
    console.error(getApiError(error));
  }

  window.store.set({ me: undefined, chats: initState.chats });
  router.go(pathnames.signIn);
};

export const changeAvatar = async (data: ChangeProfileAvatarRequest) => {
  try {
    await userApi.changeAvatar(data);
    router.go(pathnames.userProfile);
  } catch (error) {
    console.error(getApiError(error));
  }
};
