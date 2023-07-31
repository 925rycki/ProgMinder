import { FC, useEffect, useState } from "react";
import { UserInfoType } from "../../types/report";
import { createFollow, deleteFollow, getUserInfo } from "../../lib/api/report";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { DangerButton } from "../atoms/button/DangerButton";

export const UserInfo: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  useEffect(() => {
    getUserInfo(id).then((res) => setUserInfo(res.data));
  }, [id]);

  const onClickFollow = () => {
    createFollow(id);
    console.log("フォローしました。");
  }

  const onClickUnfollow = () => {
    deleteFollow(id);
    console.log("フォロー解除しました。");
  }

  if (!userInfo) {
    return null;
  }

  return (
    <VStack spacing={4} my={4}>
      <Image src={userInfo.image.url} alt="Profile Image" boxSize="200px" borderRadius="full" />
      <Text fontSize="xl" fontWeight="bold">{userInfo.nickname}</Text>
      <Text>{userInfo.bio}</Text>
      <Flex>
        <Text fontWeight="bold" mr={2}>フォロー: {userInfo.followingCount}</Text>
        <Text fontWeight="bold">フォロワー: {userInfo.followersCount}</Text>
      </Flex>
      <PrimaryButton onClick={onClickFollow}><SmallAddIcon />フォローする</PrimaryButton>
      <DangerButton onClick={onClickUnfollow}><SmallCloseIcon />フォロー解除</DangerButton>
      <Box>
        {userInfo.reports.map((report) => (
          <Box key={report.id} p={4} borderWidth="1px" borderRadius="md">
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
