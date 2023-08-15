import { FC, useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { createLike, deleteLike, getReports } from "../../lib/api/report";
import { TimelineReportType } from "../../types/report";
import { useMessage } from "../../hooks/useMessage";
import { AuthContext } from "../../App";

export const Timeline: FC = () => {
  const [reports, setReports] = useState<TimelineReportType[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { showMessage } = useMessage();

  useEffect(() => {
    getReports().then((res) => setReports(res.data));
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("ja-JP", options);
  };

  const handleCreateLike = (id: number) => {
    if (!currentUser) {
      showMessage({ title: "サインインしてください", status: "error" });
      return;
    }

    createLike(id)
      .then(() => {
        setReports(
          reports.map((report) =>
            report.report.id === id
              ? { ...report, isLiked: true, likesCount: report.likesCount + 1 }
              : report
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDeleteLike = (id: number) => {
    deleteLike(id)
      .then(() => {
        setReports(
          reports.map((report) =>
            report.report.id === id
              ? { ...report, isLiked: false, likesCount: report.likesCount - 1 }
              : report
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      {reports.length === 0 ? (
        <Text mt={{ base: "60px", md: "90px" }}>まだ投稿がありません。</Text>
      ) : (
        <Box
          mx={{ base: 2, md: 32 }}
          mt={{ base: "75px", md: "100px" }}
          mb="25px"
        >
          <List spacing={5}>
            {reports.map((data) => (
              <ListItem
                key={data.report.id}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <Stack spacing={2}>
                  <Flex
                    align="center"
                    onClick={() => navigate(`/user/${data.user.id}`)}
                    cursor="pointer"
                  >
                    <Image
                      mr={2}
                      borderRadius="full"
                      boxSize="50px"
                      src={data.user?.image.url}
                      alt="User image"
                    />
                    <Text fontWeight="bold">{data.user?.nickname}</Text>
                    <Text fontWeight="bold" ml={4}>
                      {formatDate(data.report.createdDate)}
                    </Text>
                  </Flex>

                  <Box>
                    <Text fontWeight="bold">本日の目標</Text>
                    <Text style={{ whiteSpace: "pre-line" }}>
                      {data.report.todaysGoal}
                    </Text>
                    <Text fontWeight="bold">学習時間[h]</Text>
                    <Text>{data.report.studyTime}</Text>
                    <Text fontWeight="bold">目標振り返り</Text>
                    <Text style={{ whiteSpace: "pre-line" }}>
                      {data.report.goalReview}
                    </Text>
                    <Text fontWeight="bold">詰まっていること</Text>
                    <Text style={{ whiteSpace: "pre-line" }}>
                      {data.report.challenges}
                    </Text>
                    <Text fontWeight="bold">学んだこと</Text>
                    <Text style={{ whiteSpace: "pre-line" }}>
                      {data.report.learnings}
                    </Text>
                    <Text fontWeight="bold">感想</Text>
                    <Text style={{ whiteSpace: "pre-line" }}>
                      {data.report.thoughts}
                    </Text>
                    <Text fontWeight="bold">明日の目標</Text>
                    <Text style={{ whiteSpace: "pre-line" }}>
                      {data.report.tomorrowsGoal}
                    </Text>
                  </Box>

                  <Flex>
                    <Flex align="center" mr={4}>
                      {data.isLiked ? (
                        <AiFillLike
                          size="24px"
                          onClick={() => handleDeleteLike(data.report.id)}
                          cursor="pointer"
                        />
                      ) : (
                        <AiOutlineLike
                          size="24px"
                          onClick={() => handleCreateLike(data.report.id)}
                          cursor="pointer"
                        />
                      )}
                      <Text mx={1}>{data.likesCount}</Text>
                    </Flex>
                    <Flex align="center">
                      <FaRegComment
                        size="20px"
                        onClick={() => navigate(`/reports/${data.report.id}`)}
                        cursor="pointer"
                      />
                      <Text mx={1}>{data.commentsCount}</Text>
                    </Flex>
                  </Flex>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};
