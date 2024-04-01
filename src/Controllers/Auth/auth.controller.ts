import { AuthApi, UserResponse } from '../../API/Auth';
import { pathnames, router } from '../../services/Router';
import { initState } from '../../services/Store';
import * as validators from '../../services/Validators';
import { apiHasError, getApiError } from '../../utils';
import { SignInData, SignUpData } from './type';

const authApi = new AuthApi();

export const getMe = async () => {
  let me: UserResponse;

  try {
    const responce = await authApi.request();

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      me = responce;
    }
  } catch (error) {
    throw new Error(getApiError(error));
  }

  window.store.set({ me });
};

export const signin = async (data: SignInData) => {
  const isLoginValid = validators.login(data.login).isValid;
  const isPasswordValid = validators.password(data.password).isValid;

  if (!isLoginValid || !isPasswordValid) return;

  try {
    await authApi.signIn(data);
  } catch (error) {
    throw new Error(getApiError(error));
  }

  getMe().then(() => {
    router.go(pathnames.chat);
  });
};

export const signup = async (data: SignUpData) => {
  const isLoginValid = validators.login(data.login).isValid;
  const isPasswordValid = validators.password(data.password).isValid;
  const isEmailValid = validators.email(data.email).isValid;
  const isFirstNameValid = validators.name(data.first_name).isValid;
  const isSecondNameValid = validators.name(data.second_name).isValid;
  const isPhoneValid = validators.phone(data.phone).isValid;

  if (!isLoginValid || !isPasswordValid || !isEmailValid || !isFirstNameValid || !isSecondNameValid || !isPhoneValid)
    return;

  try {
    await authApi.signUp(data);
  } catch (error) {
    throw new Error(getApiError(error));
  }

  getMe().then(() => {
    router.go(pathnames.chat);
  });
};

export const logout = async () => {
  try {
    await authApi.logOut();
  } catch (error) {
    throw new Error(getApiError(error));
  }

  window.store.set({ me: undefined, chats: initState.chats });
  router.go(pathnames.signIn);
};
