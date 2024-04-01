import { UserResponse } from '../../API/Auth';
import { ChatResponce } from '../../API/Chats';
import { startChat } from '../../Controllers/Chat';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { connect } from '../../services/Store';
import { AppState } from '../../services/Store/AppState';

export interface IChatItem {
  id: number;
  user: UserResponse;
  chat: DeepPartial<ChatResponce>;
  events: {
    click: (event: ElementEvents['click']) => void;
  };
}

export class ChatListItemRaw extends Component<IChatItem> {
  constructor(props: IChatItem) {
    const { id, chat, user, ...restProps } = props;

    const { avatar = '', title = '', unread_count = 0, last_message = {}, ...restChat } = chat;

    const click = () => {
      startChat({ chatId: id, userId: user.id });
    };

    super({
      ...restProps,
      id,
      chat: {
        ...restChat,
        avatar,
        title,
        unread_count,
        last_message,
      },
      user,
      events: {
        click,
      },
    });
  }

  render() {
    const { avatar, title, last_message, unread_count } = this.props.chat;

    return `
      <div class="chatListItem">
        <div class="chatListItem_avatar">
            {{{ Avatar  src='${avatar}' }}}
        </div>
        <div class="chatListItem_title">
            {{{ Text weight='700' size='medium' text='${title}' ellipsis=true }}}
        </div>
        <div class="chatListItem_lastMessage">
            {{{ Text size='small' type='secondary' text='${last_message?.user?.display_name}' ellipsis=true }}}:
            {{{ Text size='small' type='secondary' text='${last_message?.content}' ellipsis=true }}}
        </div>
        <div class="chatListItem_time">
            {{{ Text size='small' type='secondary' text='${last_message?.time}' }}}
        </div>
        <div class="chatListItem_messagesCount">
            {{{ Badge count='${unread_count}' }}}
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState, props: IChatItem) => {
  const { id } = props;
  return { chat: state.chats.chatsById[id] || {}, user: state.me };
};

// @ts-ignore
export const ChatListItem = connect(mapStateToProps)(ChatListItemRaw);
