import { FC, useEffect, useState } from "react";
import { ReportType } from "../../types/report";
import { getUserReports } from "../../lib/api/report";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Log: FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserReports().then((response) => setReports(response.data));
  }, []);

  return (
    <Box>
      <Heading as="h1" size="xl" mb={5}>
        ログページです。
      </Heading>
      <Stack spacing={5}>
        {reports.map((report) => (
          <Box key={report.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">今日の目標：{report.todaysGoal}</Heading>
            <Text>学習時間：{report.studyTime}時間</Text>
            <Text>達成度：{report.goalReview}</Text>
            <Text>困難な点：{report.challenges}</Text>
            <Text>学んだこと：{report.learnings}</Text>
            <Text>感想：{report.thoughts}</Text>
            <Text>明日の目標：{report.tomorrowsGoal}</Text>
            <Text>id:{report.id}</Text>
            <Button onClick={() => navigate(`/reports/${report.id}`)}>
              編集
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
