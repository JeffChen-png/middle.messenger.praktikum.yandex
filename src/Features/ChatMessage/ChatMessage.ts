import { TMessage } from '../../API/Chats';
import Component from '../../services/Component';
import { connect } from '../../services/Store';
import { AppState } from '../../services/Store/AppState';

export interface IChatMessage extends TMessage {
  me: number | undefined;
}

export class ChatMessageRaw extends Component<IChatMessage> {
  constructor(props: IChatMessage) {
    super({
      ...props,
    });
  }

  render() {
    const { user_id, content, time, me } = this.props;
    const sender = user_id === String(me) ? 'me' : 'default';
    const messageTime = new Date(time).toDateString();

    return `
      <div class="chatMessage" data-sender="${sender}" data-type="message">
        <div class="chatMessage_text">
            {{{ Text type='primary' size='small' weight='500' text='${content}' }}}
        </div>
        <div class="chatMessage_time">
            {{{ Text type='primary' size='small' weight='500' text='${messageTime}' }}}
        </div>
        {{#if readed}}
          <div class="chatMessage_status">
              {{> MessageReaded }}
          </div>
        {{/if}}
      </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => {
  return { me: state.me?.id };
};

// @ts-ignore
export const ChatMessage = connect(mapStateToProps)(ChatMessageRaw);
