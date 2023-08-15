import { FC, useContext, useEffect, useState } from "react";
import { UserInfoType } from "../../types/report";
import { createFollow, deleteFollow, getUserInfo } from "../../lib/api/report";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { DangerButton } from "../atoms/button/DangerButton";
import { AuthContext } from "../../App";
import { useMessage } from "../../hooks/useMessage";

export const UserInfo: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const { currentUser } = useContext(AuthContext);

  const { showMessage } = useMessage();

  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(id).then((res) => setUserInfo(res.data));
  }, [id]);

  const handleFollow = () => {
    if (!currentUser) {
      showMessage({ title: "サインインしてください", status: "error" });
      return;
    }

    createFollow(id)
      .then(() => {
        if (userInfo) {
          setUserInfo({
            ...userInfo,
            isFollowed: true,
            followersCount: userInfo.followersCount + 1,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUnfollow = () => {
    deleteFollow(id)
      .then(() => {
        if (userInfo) {
          setUserInfo({
            ...userInfo,
            isFollowed: false,
            followersCount: userInfo.followersCount - 1,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!userInfo) {
    return null;
  }

  return (
    <VStack spacing={4} my={4}>
      <Image
        src={userInfo.image.url}
        alt="Profile Image"
        boxSize="200px"
        borderRadius="full"
      />
      <Text fontSize="xl" fontWeight="bold">
        {userInfo.nickname}
      </Text>
      <Text>{userInfo.bio}</Text>
      <Flex>
        <Text
          fontWeight="bold"
          mr={2}
          cursor="pointer"
          onClick={() => navigate(`/following/${id}`)}
        >
          フォロー: {userInfo.followingCount}
        </Text>
        <Text
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate(`/followed/${id}`)}
        >
          フォロワー: {userInfo.followersCount}
        </Text>
      </Flex>
      {currentUser?.id !== id && (
        <>
          {userInfo.isFollowed ? (
            <DangerButton onClick={handleUnfollow}>
              <SmallCloseIcon />
              フォロー解除
            </DangerButton>
          ) : (
            <PrimaryButton onClick={handleFollow}>
              <SmallAddIcon />
              フォローする
            </PrimaryButton>
          )}
        </>
      )}
      <Box>
        {userInfo.reports.map((report) => (
          <Box key={report.id} p={4} borderWidth="1px" borderRadius="md" my={2}>
            <Text fontSize="xl">{report.createdDate}</Text>
            <Text>本日の目標: {report.todaysGoal}</Text>
            <Text>学習時間: {report.studyTime} [h]</Text>
            <Text>目標振り返り: {report.goalReview}</Text>
            <Text>詰まっていること: {report.challenges}</Text>
            <Text>学んだこと: {report.learnings}</Text>
            <Text>感想: {report.thoughts}</Text>
            <Text>明日の目標: {report.tomorrowsGoal}</Text>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};
