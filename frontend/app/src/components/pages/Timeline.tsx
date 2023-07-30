import { FC, useEffect, useState } from "react";
import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { createLike, deleteLike, getReports } from "../../lib/api/report";
import { TimelineReportType } from "../../types/report";

export const Timeline: FC = () => {
  const [reports, setReports] = useState<TimelineReportType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReports().then((res) => setReports(res.data));
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("ja-JP", options);
  };

  const handleCreateLike = (id: number) => {
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
    <Box m={2}>
      <Stack spacing={5}>
        {reports.map((data) => (
          <Box key={data.report.id} p={5} shadow="md" borderWidth="1px">
            <Flex align="center">
              <Image
                borderRadius="full"
                boxSize="50px"
                src={data.user?.image.url}
                alt="User image"
              />
              <Text fontWeight="bold">{data.user?.nickname}</Text>
            </Flex>
            <Heading fontSize="xl">
              {formatDate(data.report.createdDate)}
            </Heading>
            <Text>本日の目標：{data.report.todaysGoal}</Text>
            <Text>学習時間[h]:{data.report.studyTime}</Text>
            <Text>目標振り返り:{data.report.goalReview}</Text>
            <Text>詰まっていること：{data.report.challenges}</Text>
            <Text>学んだこと：{data.report.learnings}</Text>
            <Text>感想：{data.report.thoughts}</Text>
            <Text>明日の目標：{data.report.tomorrowsGoal}</Text>
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
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
