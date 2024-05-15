import { Input } from '../../Components';
import { logout } from '../../Controllers/Auth';
import { getMe } from '../../Controllers/Auth/auth.controller';
import { changeUser } from '../../Controllers/User';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { pathnames, router } from '../../services/Router';
import { connect } from '../../services/Store';
import { AppState } from '../../services/Store/AppState';
import * as validators from '../../services/Validators';

interface IProps {
  src?: string;
  alt?: string;
  validate?: {};
  value?: {
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    phone?: string;
    display_name?: string;
  };
  changeUserAvatar?: () => void;
  changeUserProfile?: (event: ElementEvents['click']) => void;
  exit?: (event: ElementEvents['click']) => void;
  changePassword?: (event: ElementEvents['click']) => void;
}

type Refs = {
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  phone: Input;
  display_name: Input;
};

export class UserProfileRaw extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    const { src = '', alt = '', ...restProps } = props;
    super({
      ...restProps,
      src,
      alt,
      validate: {
        password: validators.password,
        email: validators.email,
        name: validators.name,
        phone: validators.phone,
      },
      changeUserProfile: (event: ElementEvents['click']) => {
        event.preventDefault();

        const fields: Array<keyof Refs> = ['email', 'login', 'first_name', 'second_name', 'phone', 'display_name'];

        let isValid = true;
        const fieldsValues: Record<string, string> = {};

        fields.forEach(field => {
          const value = this.refs[field].value();
          const isFieldValid = this.refs[field].validate();

          isValid = isValid && isFieldValid;
          fieldsValues[field] = value;
        });

        changeUser({
          email: fieldsValues.email,
          login: fieldsValues.login,
          first_name: fieldsValues.first_name,
          second_name: fieldsValues.second_name,
          phone: fieldsValues.phone,
          display_name: fieldsValues.display_name,
        });
      },
      exit: () => {
        logout();
      },
      changePassword: () => {
        router.go(pathnames.changePassword);
      },
      changeUserAvatar: () => {
        router.go(pathnames.loadAvatar);
      },
    });
  }

  componentDidMount(): void {
    getMe();
  }

  render() {
    return `
      <div class="userProfile">
        <div class="userProfile_container shadow">
          <div class="userProfile_header">
            {{{ Avatar src=avatar alt='profile' onClick=changeUserAvatar }}}
            {{{ Text size='large' weight='700' text=first_name }}}
          </div>
          <form class="userProfile_form">
            {{{ Input value=email validate=validate.email ref="email" placeholder="Почта" type='email' name='email' id='email' }}}
            {{{ Input value=login validate=validate.login ref="login" placeholder="Логин" name='login' id='login' }}}
            {{{ Input value=first_name validate=validate.name ref="first_name" placeholder="Имя" name='first_name' id='first_name' }}}
            {{{ Input value=second_name validate=validate.name ref="second_name" placeholder="Фамилия" name='second_name' id='second_name' }}}
            {{{ Input value=phone validate=validate.phone ref="phone" placeholder="Телефон" name='phone' id='phone' }}}
            {{{ Input value=display_name ref="display_name" placeholder="Имя в чате" name='display_name' id='display_name' }}}
          </form>
          <div class="userProfile_actions">
            {{{ Button label="Изменить данные" type="text" onClick=changeUserProfile }}}
            {{{ Button label="Изменить пароль" type="text" onClick=changePassword }}}
            {{{ Button label="Выйти" type="text" danger=true onClick=exit }}}
          </div>
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => {
  const { me } = state;
  return me || {};
};

export const UserProfile = connect(mapStateToProps)(UserProfileRaw);
