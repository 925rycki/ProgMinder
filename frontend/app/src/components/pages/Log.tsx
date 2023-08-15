import { FC, useEffect, useState } from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ReportType } from "../../types/report";
import { getCurrentUserReports } from "../../lib/api/report";

export const Log: FC = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUserReports().then((res) => {
      console.log(res.data);
      setReports(res.data);
    });
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("ja-JP", options);
  };

  return (
    <>
      {reports.length === 0 && (
        <Text>学習記録を作成するとここに表示されます。</Text>
      )}
      <Box m={2}>
        <Stack spacing={5}>
          {reports.map((data) => (
            <Box
              key={data.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              onClick={() => navigate(`/logs/${data.id}`)}
              cursor="pointer"
            >
              <Heading fontSize="xl">{formatDate(data.createdDate)}</Heading>
              <Text>本日の目標：{data.todaysGoal}</Text>
              <Text>学習時間[h]：{data.studyTime}</Text>
              <Text>達成度：{data.goalReview}</Text>
              <Text>困難な点：{data.challenges}</Text>
              <Text>学んだこと：{data.learnings}</Text>
              <Text>感想：{data.thoughts}</Text>
              <Text>明日の目標：{data.tomorrowsGoal}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};
