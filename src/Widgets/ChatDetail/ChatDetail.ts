import { ChatResponce, TMessage } from '../../API/Chats';
import { Input } from '../../Components';
import { leaveChat, sendMessage as sendMessageFn } from '../../Controllers/Chat';
import { addUser, deleteUser } from '../../Controllers/Chat/chat.controlles';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { connect } from '../../services/Store';
import { AppState } from '../../services/Store/AppState';
import * as validators from '../../services/Validators';

export interface IChatDetail {
  id?: number;
  connectionString?: string;
  messages?: TMessage[];
  chat?: DeepPartial<ChatResponce>;
  validate?: {};
  sendMessage: (event: ElementEvents['click']) => void;
  addUser?: (event: ElementEvents['click']) => void;
  removeUser?: (event: ElementEvents['click']) => void;
}

type Refs = {
  message: Input;
  userId: Input;
};

export class ChatDetailRaw extends Component<IChatDetail, Refs> {
  constructor(props: IChatDetail) {
    super({
      ...props,
      validate: {
        message: validators.message,
      },
      sendMessage: (event: ElementEvents['click']) => {
        event.preventDefault();

        const isValid = this.refs.message.validate();
        if (!isValid) return;

        const message = this.refs.message.value();

        sendMessageFn(message);
      },
      addUser: () => {
        const userId = +this.refs.userId.value();
        const chatId = this.props.id;

        if (!chatId) return;

        addUser({
          users: [userId],
          chatId,
        });
      },
      removeUser: () => {
        const userId = +this.refs.userId.value();
        const chatId = this.props.id;

        if (!chatId) return;

        deleteUser({
          users: [userId],
          chatId,
        });
      },
    });
  }

  protected componentDidUpdate(_oldProps: IChatDetail, _newProps: IChatDetail): boolean {
    const { connectionString: oldConnectionString } = _oldProps;
    const { connectionString: newConnectionString } = _newProps;

    if (oldConnectionString !== newConnectionString) {
      // eslint-disable-next-line unicorn/no-lonely-if
      if (oldConnectionString) leaveChat({ connectionString: oldConnectionString });
    }

    return true;
  }

  protected componentDidUnmount(): void {
    const { connectionString } = this.props;

    if (!connectionString) return;
    leaveChat({ connectionString });
  }

  render() {
    if (this.props.id) {
      return `
      <div class="chatDetail">
        <div class="chatDetail_header">
          <div class="chatDetail_img">
            {{{ Avatar src=chat.avatar alt=alt }}}
          </div>
          <div class="chatDetail_title">
            {{{ Text weight='700' type='primary' size='medium' text=chat.title }}}
          </div>
          <div class="chatDetail_actions">
            {{{ Input ref='userId' placeholder='Введите айди пользователя' }}}
            {{{ Button type='text' shape='circle' label='Добавить участника' onClick=addUser }}}
            {{{ Button type='text' shape='circle' label='Удалить участника' onClick=removeUser }}}
          </div>
        </div>
        <div class="chatDetail_body">
          <ul class="chatDetail_list">
            {{#each messages}}
              <li>
              {{{ ChatMessage 
                  user_id=this.user_id
                  type='message'
                  content=this.content 
                  readed=this.readed
                  time=this.time 
              }}}
              </li>
            {{/each}}
          </ul>
        </div>
        <div class="chatDetail_footer">
          {{> Clip }}
          <div class="chatDetail_form">
            {{{ Input ref='message' validate=validate.message placeholder='Сообщение' id='message' name='message'  }}}
          </div>
          {{{ Button type='primary' shape='circle' label='→' onClick=sendMessage }}}
        </div>
      </div>
    `;
    } else {
      return '<div></div>';
    }
  }
}

const mapStateToProps = (state: AppState) => {
  const { activeChatId, chats, activeChat } = state;
  const chat = activeChatId ? chats.chatsById[activeChatId] : {};
  return {
    chat,
    id: activeChatId,
    messages: activeChat.messages.reverse(),
    connectionString: activeChat.connectionString,
  };
};

// @ts-ignore
export const ChatDetail = connect(mapStateToProps)(ChatDetailRaw);
