import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";

import { signOut } from "../../lib/api/auth";
import { AuthContext } from "../../App";
import { useMessage } from "../../hooks/useMessage";

type Props = {
  loading: boolean;
  isSignedIn: boolean;
};

export const MenuDrawerAuthButtons: FC<Props> = (props) => {
  const { loading, isSignedIn } = props;

  const { showMessage } = useMessage();

  const { setIsSignedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigate("/signin");

        showMessage({ title: "サインアウトしました", status: "success" });
      } else {
        showMessage({ title: "サインアウトできません", status: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!loading) {
    if (isSignedIn) {
      return (
        <>
          <Button w="100%" onClick={() => navigate("/")}>
            ホーム
          </Button>
          <Button w="100%" onClick={onClickSignOut}>
            サインアウト
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button w="100%" onClick={() => navigate("/")}>
            ホーム
          </Button>
          <Button w="100%" onClick={() => navigate("/signin")}>
            サインイン
          </Button>
          <Button w="100%" onClick={() => navigate("/signup")}>
            サインアップ
          </Button>
        </>
      );
    }
  } else {
    return <></>;
  }
};
