import { ChangeEvent, FC, useCallback, useContext, useState } from "react";
import {
  Box,
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
import { AttachmentIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AuthContext } from "../../App";
import { signUp } from "../../lib/api/auth";
import { SignUpFormData } from "../../interfaces/Auth";
import { useMessage } from "../../hooks/useMessage";

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const handleClick = () => setShow(!show);

  // アップロードした画像のデータを取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  // 画像プレビューを表示
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const createFormData = (): SignUpFormData => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", `${name}@temp.com`);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);
    formData.append("image", image);

    return formData;
  };

  const onClickSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = createFormData();

    try {
      const res = await signUp(data);
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        showMessage({ title: "サインアップしました", status: "success" });
        navigate("/");

        setName("");
        setPassword("");
        setPasswordConfirmation("");
      }
    } catch (err) {
      console.log(err);
      showMessage({ title: "サインアップできません", status: "error" });
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ProgMinder
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <label htmlFor="icon-button-file">
            <IconButton
              colorScheme="blue"
              aria-label="upload picture"
              icon={<AttachmentIcon />}
              onClick={() => {
                document.getElementById("icon-button-file")?.click();
              }}
            />
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e);
                previewImage(e);
              }}
              style={{ display: "none" }}
            />
          </label>
          <img src={preview} alt="preview img" />
          <Input placeholder="ユーザーID(半角英数字)" value={name} onChange={onChangeName} />
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
          <Input
            placeholder="パスワード（確認）"
            value={passwordConfirmation}
            onChange={onChangePasswordConfirmation}
            type="password"
          />
          <PrimaryButton
            onClick={onClickSignUp}
            isDisabled={
              !name || !password || !passwordConfirmation ? true : false
            }
          >
            サインアップ
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
};
