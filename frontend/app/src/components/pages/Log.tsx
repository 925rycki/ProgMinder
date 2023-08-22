import { FC, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

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
        <Text mt={{ base: "60px", md: "90px" }}>
          学習記録を作成するとここに表示されます。
          <Text>
            上部メニューバーの
            <ChakraLink as={RouterLink} to="/report" color="blue.500">
              レポート
            </ChakraLink>
            をクリックして記録を作成してみましょう！
          </Text>
        </Text>
      )}
      <Box m={2} mt={{ base: "75px", md: "100px" }} mb="25px">
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
              <Text fontWeight="bold">本日の目標</Text>
              <Text style={{ whiteSpace: "pre-line" }}>{data.todaysGoal}</Text>
              <Text fontWeight="bold">学習時間[h]</Text>
              <Text>{data.studyTime}</Text>
              <Text fontWeight="bold">目標振り返り</Text>
              <Text style={{ whiteSpace: "pre-line" }}>{data.goalReview}</Text>
              <Text fontWeight="bold">詰まっていること</Text>
              <Text style={{ whiteSpace: "pre-line" }}>{data.challenges}</Text>
              <Text fontWeight="bold">学んだこと</Text>
              <Text style={{ whiteSpace: "pre-line" }}>{data.learnings}</Text>
              <Text fontWeight="bold">感想</Text>
              <Text style={{ whiteSpace: "pre-line" }}>{data.thoughts}</Text>
              <Text fontWeight="bold">明日の目標</Text>
              <Text style={{ whiteSpace: "pre-line" }}>
                {data.tomorrowsGoal}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};
