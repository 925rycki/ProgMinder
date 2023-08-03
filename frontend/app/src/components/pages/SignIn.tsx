import { ChangeEvent, FC, useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AuthContext } from "../../App";
import { signIn } from "../../lib/api/auth";
import { useMessage } from "../../hooks/useMessage";
import { SignInData } from "../../interfaces/Auth";

export const SignIn: FC = () => {
  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInData = {
      name: name,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        showMessage({ title: "サインインしました", status: "success" });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      showMessage({ title: "サインインできません", status: "error" });
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ProgMinder
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={name}
            onChange={onChangeName}
          />
          <InputGroup>
            <Input
              placeholder="パスワード"
              value={password}
              onChange={onChangePassword}
              type={show ? "text" : "password"}
            />
            <InputRightElement>
              <IconButton
                aria-label="show/hide icon"
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                size="sm"
                variant="unstyled"
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          <PrimaryButton
            onClick={handleSignIn}
            isDisabled={!name || !password ? true : false}
          >
            サインイン
          </PrimaryButton>
          <Button
            bg="white"
            size="sm"
            variant="link"
            onClick={() => navigate("/signup")}
          >
            サインアップはこちら
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
