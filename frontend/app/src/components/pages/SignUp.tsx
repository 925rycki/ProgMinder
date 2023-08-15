import { ChangeEvent, FC, useCallback, useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AuthContext } from "../../App";
import { signUp } from "../../lib/api/auth";
import { SignUpFormData } from "../../interfaces/Auth";
import { useMessage } from "../../hooks/useMessage";

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<string>("/default-user-icon.jpeg");
  const [preview, setPreview] = useState<string>("/default-user-icon.jpeg");

  const [nicknameCount, setNicknameCount] = useState<number>(0);
  const [nameCount, setNameCount] = useState<number>(0);
  const [bioCount, setBioCount] = useState<number>(0);
  const [passwordCount, setPasswordCount] = useState<number>(0);

  const handleClick = () => setShow(!show);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const createFormData = async (): Promise<SignUpFormData> => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("nickname", nickname);
    formData.append("bio", bio);
    formData.append("email", `${name}@temp.com`);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);
    if (image === "/default-user-icon.jpeg") {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "default-user-icon.jpeg", {
        type: "image/jpeg",
      });
      formData.append("image", file);
    } else {
      formData.append("image", image);
    }

    return formData;
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = createFormData();

    try {
      const res = await signUp(await data);
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

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setName(value);
      setNameCount(value.length);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setNickname(value);
      setNicknameCount(value.length);
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setBio(value);
      setBioCount(value.length);
    }
  };

  const handlPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 128) {
      setPassword(value);
      setPasswordCount(value.length);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ProgMinder
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <VStack>
            <label htmlFor="icon-button-file">
              <Center>
                <Button
                  mr={2}
                  onClick={() => {
                    document.getElementById("icon-button-file")?.click();
                  }}
                  fontSize="sm"
                >
                  プロフィール画像をアップロード
                </Button>
              </Center>
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
            {preview && (
              <Image
                src={preview}
                alt="preview img"
                boxSize="200px"
                borderRadius="full"
              />
            )}
          </VStack>
          <Text>
            ユーザーID<span style={{ color: "red" }}>*</span>({nameCount}/16)
          </Text>
          <Input
            placeholder="ユーザーID(半角英数字)"
            value={name}
            onChange={handleNameChange}
          />
          <Text>
            ニックネーム<span style={{ color: "red" }}>*</span>({nicknameCount}
            /16)
          </Text>
          <Input
            placeholder="ニックネーム(表示名)"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <Text>自己紹介文({bioCount}/255)</Text>
          <Textarea
            placeholder="自己紹介文"
            value={bio}
            onChange={handleBioChange}
          />
          <Text>
            パスワード<span style={{ color: "red" }}>*</span>({passwordCount}
            /6~128)
          </Text>
          <InputGroup>
            <Input
              placeholder="パスワード"
              value={password}
              onChange={handlPasswordChange}
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
            onClick={handleSignUp}
            isDisabled={
              !image || !name || !password || !passwordConfirmation
                ? true
                : false
            }
          >
            サインアップ
          </PrimaryButton>
          <Button
            bg="white"
            size="sm"
            variant="link"
            onClick={() => navigate("/signin")}
          >
            サインインはこちら
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
