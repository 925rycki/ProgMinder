import { FC, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { signOut } from "../../lib/api/auth";
import { AuthContext } from "../../App";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";

type Props = {
  loading: boolean;
  isSignedIn: boolean;
};

export const AuthButtons: FC<Props> = (props) => {
  const { loading, isSignedIn } = props;

  const { showMessage } = useMessage();

  const { setIsSignedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const activeStyle = {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
  };

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
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
          <PrimaryButton
            onClick={() => navigate("/timeline")}
            style={location.pathname === "/timeline" ? activeStyle : {}}
          >
            タイムライン
          </PrimaryButton>
          <PrimaryButton
            onClick={() => navigate("/follow")}
            style={location.pathname === "/follow" ? activeStyle : {}}
          >
            フォロー
          </PrimaryButton>
          <PrimaryButton
            onClick={() => navigate("/report")}
            style={location.pathname === "/report" ? activeStyle : {}}
          >
            レポート
          </PrimaryButton>
          <PrimaryButton
            onClick={() => navigate("/log")}
            style={location.pathname === "/log" ? activeStyle : {}}
          >
            ログ
          </PrimaryButton>
          <PrimaryButton
            onClick={() => navigate("/profile")}
            style={location.pathname === "/profile" ? activeStyle : {}}
          >
            プロフィール
          </PrimaryButton>
          <PrimaryButton onClick={handleSignOut}>サインアウト</PrimaryButton>
        </>
      );
    } else {
      return (
        <>
          <PrimaryButton onClick={() => navigate("/signin")}>
            サインイン
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate("/signup")}>
            サインアップ
          </PrimaryButton>
        </>
      );
    }
  } else {
    return <></>;
  }
};
