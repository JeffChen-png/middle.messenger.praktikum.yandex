import { Input } from '../../Components';
import { signin } from '../../Controllers/Auth';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { pathnames, router } from '../../services/Router';
import * as validators from '../../services/Validators';

interface IProps {}

type Refs = {
  login: Input;
  password: Input;
};

export class SignInPage extends Component<IProps, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password,
      },
      onSignIn: (event: ElementEvents['click']) => {
        event.preventDefault();

        const login = this.refs.login.value();
        const password = this.refs.password.value();

        signin({ login, password });
      },
      onSignUp: (event: ElementEvents['click']) => {
        event.preventDefault();

        router.go(pathnames.signUp);
      },
    });
  }

  render() {
    return `
      <div class="signIn_container shadow">
        <div class="signIn_header">
          {{{ Text size='large' weight='700' text='Вход' }}}
        </div>
        <form class="signIn_form">
          {{{ Input placeholder="Логин" ref="login" name='login' id='login' validate=validate.login }}}
          {{{ Input placeholder="Пароль" ref="password" type='password' name='password' id='password' validate=validate.password }}}
        </form>
        <div class="signIn_actions">
          {{{ Button label="Авторизоваться" type="primary" onClick=onSignIn }}}
          {{{ Button label="Нет аккаунта ?" type="text" onClick=onSignUp }}}
        </div>
      </div>
    `;
  }
}
