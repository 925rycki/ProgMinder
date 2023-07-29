import { FC, useEffect, useState } from "react";
import { ReportType } from "../../types/report";
import { getUserReports } from "../../lib/api/report";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Log: FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserReports().then((response) => {
      console.log(response.data);
      setReports(response.data);
    });
  }, []);

  return (
    <Box>
      <Stack spacing={5}>
        {reports.map((data) => (
          <Box
            key={data.report.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            onClick={() => navigate(`/logs/${data.report.id}`)}
            cursor="pointer"
          >
            <Heading fontSize="xl">日付：{data.report.createdDate}</Heading>
            <Text>本日の目標：{data.report.todaysGoal}</Text>
            <Text>学習時間：{data.report.studyTime}時間</Text>
            <Text>達成度：{data.report.goalReview}</Text>
            <Text>困難な点：{data.report.challenges}</Text>
            <Text>学んだこと：{data.report.learnings}</Text>
            <Text>感想：{data.report.thoughts}</Text>
            <Text>明日の目標：{data.report.tomorrowsGoal}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
