import { ChatResponce, ChatsApi, CreateChatsRequest, DeleteChatsRequest } from '../../API/Chats';
import { pathnames, router } from '../../services/Router';
import { apiHasError, getApiError } from '../../utils';

const chatsApi = new ChatsApi();

const setLoading = (loading: boolean) => {
  const state = window.store.getState();
  state.chats.loading = loading;

  window.store.set({ ...state });
};

const setChats = (_chats: Array<ChatResponce>) => {
  const { chats } = window.store.getState();

  const chatsByIds: (typeof chats)['chatsById'] = {};
  const chatIds: (typeof chats)['chatIds'] = [];

  _chats.forEach(chat => {
    const chatId = chat.id;

    chatsByIds[chatId] = chat;
    chatIds.push(chatId);
  });

  const newChatIds = [...new Set([...chats.chatIds, ...chatIds])];
  const newChatsByIds = { ...chats.chatsById, ...chatsByIds };

  chats.chatIds = newChatIds;
  chats.chatsById = newChatsByIds;

  window.store.set({ chats: { ...chats } });
};

const setOffset = (offset: number) => {
  const { chats } = window.store.getState();

  chats.offset = offset;

  window.store.set({ chats: { ...chats } });
};

const removeChat = (chatId: number) => {
  const { chats } = window.store.getState();
  const { chatIds, chatsById, offset } = chats;

  delete chatsById[chatId];
  const newChatIds = chatIds.filter(id => id !== chatId);

  chats.chatIds = newChatIds;

  window.store.set({ chats: { ...chats } });
  setOffset(offset - 1);
};

export const getChats = async () => {
  const { chats } = window.store.getState();

  setLoading(true);

  try {
    const responce = await chatsApi.request({ offset: chats.offset, limit: chats.limit, title: chats.search });

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      setChats(responce);
    }
  } catch (error) {
    throw new Error(getApiError(error));
  } finally {
    setLoading(false);
  }
};

export const getMoreChats = async () => {
  const { chats } = window.store.getState();
  const newOffset = chats.offset + chats.limit;

  setOffset(newOffset);

  try {
    const responce = await chatsApi.request({ offset: newOffset, limit: chats.limit, title: chats.search });

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      setChats(responce);
    }
  } catch (error) {
    throw new Error(getApiError(error));
  } finally {
    setLoading(false);
  }
};

export const createChat = async (data: CreateChatsRequest) => {
  try {
    const responce = await chatsApi.create(data);

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      getChats();
    }

    router.go(pathnames.chat);
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const deleteChat = async (data: DeleteChatsRequest) => {
  try {
    const responce = await chatsApi.delete(data);

    if (apiHasError(responce)) {
      throw new Error(getApiError(responce));
    } else {
      removeChat(data.chatId);
      getChats();
    }
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
