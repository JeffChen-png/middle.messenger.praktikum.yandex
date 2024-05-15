import { UserResponse } from '../Auth';

export type GetUserRequest = {
  id: number;
};

export type GetUserResponse = UserResponse;

export type ChangeProfileRequest = {
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
};

export type ChangeProfileResponse = UserResponse;

export type ChangeProfileAvatarRequest = {
  avatar: File;
};

export type ChangeProfileAvatarResponse = UserResponse;

export type ChangeProfilePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ChangeProfilePasswordResponse = void;

export type SearchRequest = {
  login: string;
};

export type SearchResponse = Array<UserResponse>;
