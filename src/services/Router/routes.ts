import * as Pages from '../../Pages';
import { ComponentClass } from '../Component';

type TPageRoust = { path: string; Component: ComponentClass };

export enum pathnames {
  signIn = '/',
  signUp = '/sign-up',
  chat = '/messenger',
  notFount = '/404',
  serverError = '/500',
  userProfile = '/settings',
  addUser = '/add-user',
  removeUser = '/remove-user',
  loadAvatar = '/load-avatar',
  changePassword = '/change-password',
  createChat = '/create-chat',
}

export const routes: Array<TPageRoust> = [
  { path: pathnames.signIn, Component: Pages.SignInPage },
  { path: pathnames.signUp, Component: Pages.SignUpPage },
  { path: pathnames.chat, Component: Pages.Chat },
  { path: pathnames.notFount, Component: Pages.NotFound },
  { path: pathnames.serverError, Component: Pages.ServerError },
  { path: pathnames.userProfile, Component: Pages.UserProfile },
  { path: pathnames.addUser, Component: Pages.AddUser },
  { path: pathnames.removeUser, Component: Pages.RemoveUser },
  { path: pathnames.loadAvatar, Component: Pages.LoadAvatar },
  { path: pathnames.changePassword, Component: Pages.ChangePassword },
  { path: pathnames.createChat, Component: Pages.CreateChat },
];
