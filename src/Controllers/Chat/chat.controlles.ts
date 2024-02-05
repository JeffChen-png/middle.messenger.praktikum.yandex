import { AddUserRequest, ChatsApi } from '../../API/Chats';
import { wsClient } from '../../services/WSClient';
import { apiHasError, getApiError } from '../../utils';

import { TLeaveChat, TStartChat } from '.';

const chatsApi = new ChatsApi();

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

  return connectUrl;
};

export const leaveChat = async (data: TLeaveChat) => {
  wsClient.disconnect(data.connectionString);
};
