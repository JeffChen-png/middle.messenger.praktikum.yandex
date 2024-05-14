import { AddUserRequest, ChatsApi, TMessage } from '../../API/Chats';
import { wsClient } from '../../services/WSClient';
import { apiHasError, getApiError } from '../../utils';

import { TLeaveChat, TStartChat } from '.';

const chatsApi = new ChatsApi();

const setActiveChat = (chatId: number | undefined) => {
  window.store.set({ activeChatId: chatId });
};

const setConnectUrl = (connectionString: string) => {
  const { activeChat } = window.store.getState();
  window.store.set({ activeChat: { ...activeChat, connectionString } });
};

const setMessages = (messages: TMessage[]) => {
  const { activeChat } = window.store.getState();

  window.store.set({ activeChat: { ...activeChat, messages } });
};

const addNewMessage = (message: TMessage) => {
  const { activeChat } = window.store.getState();
  const messages = activeChat.messages || [];
  messages.push(message);

  setMessages(messages);
};

const getOldMessages = (connectUr: string) => {
  const client = wsClient.connect(connectUr);
  client.send(
    JSON.stringify({
      content: '0',
      type: 'get old',
    })
  );
};

export const addUser = async (data: AddUserRequest) => {
  try {
    const responce = await chatsApi.addUser(data);

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    }
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const startChat = async (data: TStartChat): Promise<string | undefined> => {
  let token: string;

  setActiveChat(data.chatId);
  try {
    const responce = await chatsApi.getToken({ id: data.chatId });

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      token = responce.token;
    }
  } catch (error) {
    throw new Error(getApiError(error));
  }

  const connectUrl = `/chats/${data.userId}/${data.chatId}/${token}`;

  wsClient.connect(connectUrl, {
    onMessage(event) {
      try {
        const info = JSON.parse(event.data);

        switch (info.type) {
          case 'message': {
            addNewMessage(info);
            break;
          }

          default: {
            setMessages(info);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  getOldMessages(connectUrl);
  setConnectUrl(connectUrl);

  return connectUrl;
};

export const sendMessage = (content: string) => {
  const { activeChat } = window.store.getState();
  const connectionUrl = activeChat.connectionString;

  if (!connectionUrl) return;

  const client = wsClient.connect(connectionUrl);

  client.send(
    JSON.stringify({
      content,
      type: 'message',
    })
  );
};

export const leaveChat = async (data: TLeaveChat) => {
  const { activeChat } = window.store.getState();

  wsClient.disconnect(data.connectionString);

  if (activeChat.connectionString !== data.connectionString) {
    return;
  }

  setActiveChat(undefined);
  window.store.set({ activeChat: { messages: [] } });
};
