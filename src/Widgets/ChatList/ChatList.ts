import { Input } from '../../Components';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { pathnames, router } from '../../services/Router';
import { connect } from '../../services/Store';
import { AppState } from '../../services/Store/AppState';

interface IProps {
  chatIds: number[];
  openProfile?: (event: ElementEvents['click']) => void;
  createChat?: (event: ElementEvents['click']) => void;
}

type Refs = {
  search: Input;
};

export class ChatListRaw extends Component<IProps, Refs> {
  constructor(props: IProps) {
    const { chatIds, ...restProps } = props;
    super({
      ...restProps,
      chatIds,
      openProfile: (event: ElementEvents['click']) => {
        event.preventDefault();

        router.go(pathnames.userProfile);
      },
      createChat: (event: ElementEvents['click']) => {
        event.preventDefault();

        router.go(pathnames.createChat);
      },
    });
  }

  render() {
    return `
      <div class="chatList">
        <div class="chatList_header">
          {{{ Button type='text' label='Профиль' onClick=openProfile }}}
          {{{ Input ref='search' placeholder='Поиск' }}}
          {{{ Button type='primary' label='Добавить чат' onClick=createChat }}}
        </div>
        <div class="chatList_body">
          <ul>
            {{#each chatIds}}
              <li>
                {{{ ChatListItem id=this }}}
              </li>
            {{/each}}
          </ul>
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => {
  return { chatIds: state.chats.chatIds };
};

// @ts-ignore
export const ChatList = connect(mapStateToProps)(ChatListRaw);
