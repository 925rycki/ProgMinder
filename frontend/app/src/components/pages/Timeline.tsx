import { FC, useEffect, useState } from "react";
import { ReportType } from "../../types/report";
import { createLike, deleteLike, getReports } from "../../lib/api/report";
import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

export const Timeline: FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReports().then((response) => setReports(response.data));
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
    <Box>
      <Stack spacing={5}>
        {reports.map((data: ReportType) => (
          <Box key={data.report.id} p={5} shadow="md" borderWidth="1px">
            <Flex align="center">
              <Image borderRadius="full" boxSize="50px" src={data.user?.image.url} alt="User image" />
              <Text fontWeight="bold" >{data.user?.name}</Text>
            </Flex>
            <Heading fontSize="xl">
              {formatDate(data.report.createdDate)}
            </Heading>
            <Text>本日の目標：{data.report.todaysGoal}</Text>
            <Text>学習時間[h]：{data.report.studyTime}</Text>
            <Text>目標振り返り：{data.report.goalReview}</Text>
            <Text>詰まっていること：{data.report.challenges}</Text>
            <Text>学んだこと：{data.report.learnings}</Text>
            <Text>感想：{data.report.thoughts}</Text>
            <Text>明日の目標：{data.report.tomorrowsGoal}</Text>
            <Flex>
              <Flex align="center">
                {data.isLiked ? (
                  <AiFillLike
                    onClick={() => handleDeleteLike(data.report.id)}
                  />
                ) : (
                  <AiOutlineLike
                    onClick={() => handleCreateLike(data.report.id)}
                  />
                )}
                 {data.likesCount}
              </Flex>
              <Flex align="center">
                <LiaComment onClick={() => navigate(`/reports/${data.report.id}`)} />
                 {data.commentsCount}
              </Flex>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
