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
  IconButton,
} from "@chakra-ui/react";
import { FC, useState, useRef, useEffect, useContext } from "react";
import { accountDelete, updateUserInfo } from "../../lib/api/auth";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { DangerButton } from "../atoms/button/DangerButton";
import { AuthContext } from "../../App";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AttachmentIcon } from "@chakra-ui/icons";

export const Profile: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const [image, setImage] = useState<File | null>(null); 
  const [preview, setPreview] = useState<string>(currentUser?.image?.url || "");
  const [nickname, setNickname] = useState<string | undefined>(currentUser?.nickname);
  const [bio, setBio] = useState<string | undefined>(currentUser?.bio);
  const [password, setPassword] = useState<string>();

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

  const onClickAccountDelete = async () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setPreview(currentUser?.image?.url || "");
    setNickname(currentUser?.nickname);
    setBio(currentUser?.bio);
  }, [currentUser]);
  
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
  const onChangeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onClickUpdate = async () => {
    try {
      // FormDataインスタンスを作成
      const formData = new FormData();
  
      // FormDataにユーザー情報を追加（undefinedでないことを確認）
      if (currentUser?.name) {
        formData.append('name', currentUser?.name);
      }
      if (nickname) {
        formData.append('nickname', nickname);
      }
      if (bio) {
        formData.append('bio', bio);
      }
      
      // パスワードが入力されている場合だけ、パスワードも追加
      if (password) {
        formData.append('password', password);
      }
      
      // 画像ファイルが選択されている場合だけ、画像も追加
      if (image) {
        formData.append('image', image, image.name);  // 画像名も送信
      }
  
      // 更新処理を行う
      await updateUserInfo(formData);
  
      // 更新が完了したらメッセージを表示する
      showMessage({ title: "プロフィール情報が更新されました", status: "success" });
    } catch (err) {
      // エラーが発生した場合はエラーメッセージを表示する
      showMessage({ title: "プロフィール情報の更新に失敗しました", status: "error" });
    }
  };  

    // 画像のアップロードとプレビューのための関数
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
          <Text>ユーザー名（変更できません）</Text>
          <Input
            type="text"
            value={currentUser?.name}
            isReadOnly
          />
          <Text>ニックネーム</Text>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={onChangeNickname}
          />
          <Text>自己紹介</Text>
          <Textarea
            name="bio"
            value={bio}
            onChange={onChangeBio}
          />
          <Text>パスワード</Text>
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="新しいパスワードを入力"
            onChange={onChangePassword}
          />
          <PrimaryButton onClick={onClickUpdate}>
            更新
          </PrimaryButton>
          <DangerButton onClick={onClickAccountDelete}>
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
