import { FC, useContext } from "react";
import { Box, Image } from "@chakra-ui/react";
import { AuthContext } from "../../App";

export const Home: FC = () => {
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  if (!loading) {
    if (isSignedIn) {
      return (
        <>
          <Box boxSize="sm">
            <Image src={currentUser?.image?.url} alt="User image" />
          </Box>
          <h1>こんにちは、{currentUser?.name}さん！</h1>
          <h2>あなたのメールアドレスは{currentUser?.email}です。</h2>
        </>
      );
    } else {
      return <p>サインインしていません</p>;
    }
  } else {
    return <></>;
  }
};
