import { FC, useContext, useEffect, useState } from "react";
import { UserInfoType } from "../../types/report";
import { createFollow, deleteFollow, getUserInfo } from "../../lib/api/report";
import { Flex, Image, List, ListItem, Text, VStack } from "@chakra-ui/react";
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
    console.log(userInfo);
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

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("ja-JP", options);
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
    <VStack spacing={4} my={4} mt={{ base: "75px", md: "100px" }}>
      <Image
        src={userInfo.image.url}
        alt="Profile Image"
        boxSize="200px"
        borderRadius="full"
      />
      <Text fontSize="xl" fontWeight="bold">
        {userInfo.nickname}
      </Text>
      <Text style={{ whiteSpace: "pre-line" }}>{userInfo.bio}</Text>
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
      <List width="80%">
        {userInfo.reports.map((report) => (
          <ListItem key={report.id} my={2} p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">
              {formatDate(report.createdDate)}
            </Text>
            <Text fontWeight="bold">本日の目標</Text>
            <Text style={{ whiteSpace: "pre-line" }}>{report.todaysGoal}</Text>
            <Text fontWeight="bold">学習時間[h]</Text>
            <Text style={{ whiteSpace: "pre-line" }}>{report.studyTime}</Text>
            <Text fontWeight="bold">目標振り返り</Text>
            <Text style={{ whiteSpace: "pre-line" }}>{report.goalReview}</Text>
            <Text fontWeight="bold">詰まっていること</Text>
            <Text style={{ whiteSpace: "pre-line" }}>{report.challenges}</Text>
            <Text fontWeight="bold">学んだこと</Text>
            <Text style={{ whiteSpace: "pre-line" }}>{report.learnings}</Text>
            <Text fontWeight="bold">感想</Text>
            <Text style={{ whiteSpace: "pre-line" }}>{report.thoughts}</Text>
            <Text fontWeight="bold">明日の目標</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {report.tomorrowsGoal}
            </Text>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};
