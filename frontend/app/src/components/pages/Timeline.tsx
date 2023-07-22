import { FC, useEffect, useState } from "react";
import { ReportType } from "../../types/report";
import { getReports } from "../../lib/api/report";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

export const Timeline: FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);

  useEffect(() => {
    getReports().then((response) => setReports(response.data));
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  }

  return (
    <Box>
      <Stack spacing={5}>
        {reports.map((report) => (
          <Box key={report.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{formatDate(report.createdDate)}</Heading>
            <Text>本日の目標：{report.todaysGoal}</Text>
            <Text>学習時間：{report.studyTime}時間</Text>
            <Text>目標振り返り：{report.goalReview}</Text>
            <Text>詰まっていること：{report.challenges}</Text>
            <Text>学んだこと：{report.learnings}</Text>
            <Text>感想：{report.thoughts}</Text>
            <Text>明日の目標：{report.tomorrowsGoal}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
