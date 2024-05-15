import { getMe } from '../../Controllers/Auth/auth.controller';
import { getChats } from '../../Controllers/Chats';
import Component from '../../services/Component';

interface IProps {}

export class Chat extends Component<IProps> {
  constructor(props: IProps = {}) {
    super(props);
  }

  componentDidMount(): void {
    getMe();
    getChats?.();
  }

  render() {
    return `
      <div class="chat">
        <div class="chat_chatList">{{{ ChatList }}}</div>
        <div class="chat_chatDetail">{{{ ChatDetail }}}</div>
      </div>
    `;
  }
}
