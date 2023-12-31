import Cookies from "js-cookie";
import { SignInData, SignUpFormData } from "../../interfaces/Auth";
import client from "./client";

// サインアップ
export const signUp = (data: SignUpFormData) => {
  return client.post("auth", data);
};

// サインイン
export const signIn = (data: SignInData) => {
  return client.post("auth/sign_in", data);
};

// サインアウト
export const signOut = () => {
  return client.delete("auth/sign_out");
};

// アカウント削除
export const accountDelete = () => {
  return client.delete("auth");
};

// ユーザー情報更新
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUserInfo = (data: any) => {
  return client.put("auth", data);
};

// 認証中ユーザーの情報を取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;
  return client.get("auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
