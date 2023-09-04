export interface SignUpData {
  name: string;
  nickname: string;
  bio: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  image: string;
}

export interface SignUpFormData extends FormData {
  append(name: keyof SignUpData, value: string | Blob, fileName?: string): void;
}

export interface SignInData {
  name: string;
  password: string;
}

export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname: string;
  image: {
    url: string;
  };
  bio: string;
  allowPasswordChange: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
