import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { pathnames, router } from '../../services/Router';

interface IProps {
  toChats?: (event: ElementEvents['click']) => void;
}

export class ServerError extends Component<IProps> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      toChats: () => {
        router.go(pathnames.signIn);
      },
    });
  }

  render() {
    return `
    <div class="serverError">
      <div class="serverError_container">
          <span class="serverError_status">500</span>
          {{{ Text text="Мы уже фиксим" type='primary' size='large' }}}
          {{{ Button type='text' label='Назад к чатам' onClick=toChats }}}
      </div>
    </div>
    `;
  }
}
