import { ChatResponce, TMessage } from '../../API/Chats';
import { Input } from '../../Components';
import { leaveChat, sendMessage as sendMessageFn } from '../../Controllers/Chat';
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
}

type Refs = {
  message: Input;
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

        this.refs.message.validate();
        const message = this.refs.message.value();

        sendMessageFn(message);
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
    return `
    <div class="chatDetail">
      <div class="chatDetail_header">
        <div class="chatDetail_img">
          {{{ Avatar src=src alt=alt }}}
        </div>
        <div class="chatDetail_title">
          {{{ Text weight='700' type='primary' size='medium' text=title }}}
        </div>
        <div class="chatDetail_actions">
          {{> DotsInColumn}}
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
  }
}

const mapStateToProps = (state: AppState) => {
  const { activeChatId, chats, activeChat } = state;
  const chat = activeChatId ? chats.chatsById[activeChatId] : {};

  return { chat, id: activeChatId, messages: activeChat.messages, connectionString: activeChat.connectionString };
};

// @ts-ignore
export const ChatDetail = connect(mapStateToProps)(ChatDetailRaw);
