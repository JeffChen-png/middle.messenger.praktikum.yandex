import { BaseAPI } from '../../services/BaseApiClient';
import { ApiError, HTTPTransport } from '../../services/HTTPClient';
import {
  AddUserRequest,
  AddUserResponse,
  CreateChatsRequest,
  CreateChatsResponse,
  DeleteChatsRequest,
  DeleteChatsResponse,
  GetChatsRequest,
  GetChatsResponse,
  GetTokenRequest,
  GetTokenResponse,
} from './type';

const chatsAPIInstance = new HTTPTransport('/chats');

export class ChatsApi extends BaseAPI {
  request(data: GetChatsRequest): Promise<GetChatsResponse | ApiError> {
    return chatsAPIInstance.get('', { data });
  }

  create(data: CreateChatsRequest): Promise<CreateChatsResponse | ApiError> {
    return chatsAPIInstance.post('', { data });
  }

  delete(data: DeleteChatsRequest): Promise<DeleteChatsResponse | ApiError> {
    return chatsAPIInstance.delete('', { data });
  }

  addUser(data: AddUserRequest): Promise<AddUserResponse | ApiError> {
    return chatsAPIInstance.put('/users', { data });
  }

  getToken({ id, ...data }: GetTokenRequest): Promise<GetTokenResponse | ApiError> {
    return chatsAPIInstance.post(`/token/${id}`, { data });
  }
}
