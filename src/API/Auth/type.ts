export type SingInRequest = {
  login: string;
  password: string;
};

export type SignInResponse = void;

export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  id: number;
};
