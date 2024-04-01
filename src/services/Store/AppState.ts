import { UserResponse } from '../../API/Auth';
import { ChatResponce } from '../../API/Chats';
import { Store } from './store';

export type AppState = {
  error?: string;
  me?: UserResponse;
  chats: {
    chatsById: Record<string, ChatResponce>;
    chatIds: number[];
    offset: number;
    limit: number;
    search: string;
    loading: boolean;
  };
  activeChatId?: number;
  activeChat: {
    messages: [];
    connectionString?: string;
  };
};

declare global {
  interface Window {
    store: Store<AppState>;
  }
}

export const initState: AppState = {
  chats: {
    chatsById: {},
    chatIds: [],
    offset: 0,
    limit: 30,
    loading: false,
    search: '',
  },
  activeChatId: undefined,
  activeChat: {
    messages: [],
    connectionString: undefined,
  },
};

export const registerAppState = () => {
  window.store = new Store<AppState>(initState);
};
