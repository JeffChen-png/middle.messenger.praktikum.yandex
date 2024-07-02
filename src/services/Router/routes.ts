import * as Pages from '../../Pages';
import { ComponentClass } from '../Component';
import { pathnames } from './pathnames';

type TPageRoust = { path: string; Component: ComponentClass };

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
