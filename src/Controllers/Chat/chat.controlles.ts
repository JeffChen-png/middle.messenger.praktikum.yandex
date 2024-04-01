import { AddUserRequest, ChatsApi } from '../../API/Chats';
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

  wsClient.connect(connectUrl);

  setConnectUrl(connectUrl);

  return connectUrl;
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
