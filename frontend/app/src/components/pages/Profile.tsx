import {
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  VStack,
  Input,
  Textarea,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { FC, useState, useRef, useEffect, useContext } from "react";
import { accountDelete, updateUserInfo } from "../../lib/api/auth";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { DangerButton } from "../atoms/button/DangerButton";
import { AuthContext } from "../../App";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { getCurrentUserFollowInfo } from "../../lib/api/report";

export const Profile: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(currentUser?.image?.url || "");
  const [nickname, setNickname] = useState<string | undefined>(
    currentUser?.nickname
  );
  const [bio, setBio] = useState<string | undefined>(currentUser?.bio);
  const [password, setPassword] = useState<string>();
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const onConfirmDelete = async () => {
    await accountDelete();

    navigate("/signup");

    showMessage({ title: "アカウントを削除しました", status: "success" });
  };

  const handleAccountDelete = async () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setPreview(currentUser?.image?.url || "");
    setNickname(currentUser?.nickname);
    setBio(currentUser?.bio);
    getCurrentUserFollowInfo().then((res) => {
      setFollowingCount(res.data.followingCount);
      setFollowersCount(res.data.followersCount);
    });
  }, [currentUser]);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const onChangeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBio(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      if (currentUser?.name) {
        formData.append("name", currentUser?.name);
      }
      if (nickname) {
        formData.append("nickname", nickname);
      }
      if (bio) {
        formData.append("bio", bio);
      }

      if (password) {
        formData.append("password", password);
      }

      if (image) {
        formData.append("image", image, image.name);
      }

      await updateUserInfo(formData);

      showMessage({
        title: "プロフィール情報が更新されました",
        status: "success",
      });
    } catch (err) {
      showMessage({
        title: "プロフィール情報の更新に失敗しました",
        status: "error",
      });
    }
  };
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      setImage(file);
    }
  };

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="100px">
      <form>
        <VStack spacing="24px">
          <label htmlFor="icon-button-file">
            <Button
              onClick={() => {
                document.getElementById("icon-button-file")?.click();
              }}
            >
              画像を変更
            </Button>
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
          <Image
            src={preview}
            alt="preview img"
            boxSize="200px"
            borderRadius="full"
          />
          <Flex>
            <Text
              fontWeight="bold"
              mr={2}
              cursor="pointer"
              onClick={() => navigate(`/following/${currentUser?.id}`)}
            >
              フォロー: {followingCount}
            </Text>
            <Text
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate(`/followed/${currentUser?.id}`)}
            >
              フォロワー: {followersCount}
            </Text>
          </Flex>
          <Text>ユーザー名（変更できません）</Text>
          <Input type="text" value={currentUser?.name} isReadOnly />
          <Text>ニックネーム</Text>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={onChangeNickname}
          />
          <Text>自己紹介</Text>
          <Textarea name="bio" value={bio} onChange={onChangeBio} />
          <Text>パスワード</Text>
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="新しいパスワードを入力"
            onChange={onChangePassword}
          />
          <PrimaryButton onClick={handleUpdate}>更新</PrimaryButton>
          <DangerButton onClick={handleAccountDelete}>
            アカウントを削除
          </DangerButton>
        </VStack>
      </form>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              アカウントを削除
            </AlertDialogHeader>

            <AlertDialogBody>
              本当にアカウントを削除しますか？この操作は元に戻せません。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
