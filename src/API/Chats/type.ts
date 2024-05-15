import { UserResponse } from '../Auth';

type LastMessage = {
  user: UserResponse;
  time: string;
  content: string;
};

export type ChatResponce = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessage;
};

export type GetChatsRequest = {
  offset: number;
  limit: number;
  title: string;
};

export type GetChatsResponse = Array<ChatResponce>;

export type CreateChatsRequest = {
  title: string;
};

export type CreateChatsResponse = {};

export type DeleteChatsRequest = {
  chatId: number;
};

export type DeleteChatsResponse = {
  userId: number;
  result: ChatResponce;
};

export type AddUserRequest = {
  users: Array<number>;
  chatId: number;
};

export type AddUserResponse = void;

type TToken = {
  token: string;
};

export type GetTokenRequest = {
  id: number;
};

export type GetTokenResponse = TToken;

export type TMessage = {
  chat_id: string;
  content: string;
  time: string;
  user_id: string;
};
