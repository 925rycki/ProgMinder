// サインアップ
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  append(name: keyof SignUpData, value: string | Blob, fileName?: string): any;
}

// サインイン
export interface SignInData {
  name: string;
  password: string;
}

// ユーザー
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
