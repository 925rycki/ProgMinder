import { Box, Image, Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { FC, useContext, useState, useRef } from "react";
import { AuthContext } from "../../App";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { accountDelete } from "../../lib/api/auth";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";

export const Profile: FC = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const { showMessage } = useMessage();

  const navigate = useNavigate();

  const onClickAccountDelete = async () => {
    setIsOpen(true);
  };

  const onConfirmDelete = async () => {
      const res = await accountDelete();

        navigate("/signin");

        showMessage({ title: "アカウントを削除しました", status: "success" });
  };

      return (
        <>
          <Text>プロフィールページです。</Text>
          <Box boxSize="sm">
            <Image src={currentUser?.image?.url} alt="User image" />
          </Box>
          <h1>こんにちは、{currentUser?.name}さん！</h1>
          <PrimaryButton onClick={onClickAccountDelete}>アカウントを削除</PrimaryButton>

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
        </>
      );
};
