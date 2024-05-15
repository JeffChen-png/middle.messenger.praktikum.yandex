import { Input } from '../../Components';
import { createChat } from '../../Controllers/Chats';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { pathnames, router } from '../../services/Router';

interface IProps {}

type Refs = {
  title: Input;
};

export class CreateChat extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      createChat: async (event: ElementEvents['click']) => {
        event.preventDefault();

        const title = this.refs.title.value();
        await createChat({ title });
      },
      backToChats: () => {
        router.go(pathnames.chat);
      },
    });
  }

  render() {
    return `
      {{#> Modal}}
        <div class="createChat shadow">
            <div class="createChat_header">
                {{{ Text size='large' weight='700' text='Создать новый чат' }}}
            </div>
            <form class="createChat_form">
                {{{ Input ref='title' validate=validate.login placeholder="Введите название чата" name='title' id='title' }}}
            </form>
            <div class="createChat_actions">
                {{{ Button label="Добавить" type="primary" onClick=createChat }}}
                {{{ Button label="Назад к чатам" type="text" onClick=backToChats }}}
            </div>
        </div>
      {{/ Modal }}
    `;
  }
}
