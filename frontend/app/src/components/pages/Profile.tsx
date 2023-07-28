import { Box, Image, Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, VStack, Input, Textarea } from "@chakra-ui/react";
import { FC, useContext, useState, useRef } from "react";
import { AuthContext } from "../../App";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { accountDelete, updateUserInfo } from "../../lib/api/auth";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";
import { DangerButton } from "../atoms/button/DangerButton";

interface User {
  name: string;
  nickname: string;
  bio: string;
}

export const Profile: FC = () => {
  const [user, setUser] = useState<User>({ name: '', nickname: '', bio: '' });
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const navigate = useNavigate();

  const { showMessage } = useMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserInfo(user);
      alert('User information updated successfully');
    } catch (err) {
      console.error(err);
      alert('An error occurred, please try again');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onConfirmDelete = async () => {
    const res = await accountDelete();

      navigate("/signup");

      showMessage({ title: "アカウントを削除しました", status: "success" });
};

const onClickAccountDelete = async () => {
  setIsOpen(true);
};

  return (
    <Box maxW="md" mx="auto" mt="100px">
      <form onSubmit={handleSubmit}>
        <VStack spacing="24px">
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Nickname"
            name="nickname"
            value={user.nickname}
            onChange={handleChange}
          />
          <Textarea
            placeholder="Bio"
            name="bio"
            value={user.bio}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="blue" size="lg">
            更新
          </Button>
      <DangerButton onClick={onClickAccountDelete}>アカウントを削除</DangerButton>
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
