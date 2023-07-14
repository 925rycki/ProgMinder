import { FC, useEffect, useState } from "react";
import { ReportType } from "../../types/report";
import { deleteReport, getReportDetail, updateReport } from "../../lib/api/report";
import { Box, Button, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Stack, Text, Textarea } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export const ReportDetail: FC = () => {
  // const [report, setReport] = useState<ReportType>();

  const navigate = useNavigate();

  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  const [createdDate, setCreatedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [todaysGoal, setTodaysGoal] = useState<string>("");
  const [studyTime, setStudyTime] = useState<number>(0);
  const [goalReview, setGoalReview] = useState<string>("");
  const [challenges, setChallenges] = useState<string>("");
  const [learnings, setLearnings] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [tommorowsGoal, setTommorowsGoal] = useState<string>("");

  // useEffect(() => {
  //   getReportDetail(id).then((response) => setReport(response.data));
  // }, []);
  
  useEffect(() => {
    getReportDetail(id).then((response) => {
      // setReport(response.data);
      setCreatedDate(response.data.createdDate);
      setTodaysGoal(response.data.todaysGoal);
      setStudyTime(response.data.studyTime);
      setGoalReview(response.data.goalReview);
      setChallenges(response.data.challenges);
      setLearnings(response.data.learnings);
      setThoughts(response.data.thoughts);
      setTommorowsGoal(response.data.tommorowsGoal);
    });
  }, []);

  const handleUpdateReport = async () => {
    const updatedReport: ReportType = {
      id: id,
      createdDate: createdDate,
      todaysGoal: todaysGoal,
      studyTime: studyTime,
      goalReview: goalReview,
      challenges: challenges,
      learnings: learnings,
      thoughts: thoughts,
      tomorrowsGoal: tommorowsGoal
    };
    await updateReport(id, updatedReport);
    navigate("/log");
  };

  const handleDeleteReport = async () => {
    await deleteReport(id);
    navigate("/log");
  }

  return (
    <Box p={4}>
      {/* <Text>{report?.id}</Text>
      <Text>{report?.todaysGoal}</Text>
      <Text>{report?.studyTime}</Text>
      <Text>{report?.goalReview}</Text>
      <Text>{report?.challenges}</Text>
      <Text>{report?.learnings}</Text>
      <Text>{report?.thoughts}</Text>
      <Text>{report?.tomorrowsGoal}</Text> */}
      <FormControl id="createdDate">
        <FormLabel>作成日</FormLabel>
        <Input
          type="date"
          value={createdDate}
          onChange={(e) => setTodaysGoal(e.target.value)}
        />
      </FormControl>
      <FormControl id="todaysGoal">
        <FormLabel>今日の目標</FormLabel>
        <Textarea
          value={todaysGoal}
          onChange={(e) => setTodaysGoal(e.target.value)}
        />
      </FormControl>
      <FormControl id="studyTime">
          <FormLabel>勉強時間</FormLabel>
          <NumberInput
            value={studyTime}
            onChange={(valueString) => setStudyTime(Number(valueString))}
            precision={2}
            min={0}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="goalReview">
          <FormLabel>目標レビュー</FormLabel>
          <Textarea
            value={goalReview}
            onChange={(e) => setGoalReview(e.target.value)}
          />
        </FormControl>

        <FormControl id="challenges">
          <FormLabel>課題</FormLabel>
          <Textarea
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
          />
        </FormControl>

        <FormControl id="learnings">
          <FormLabel>学び</FormLabel>
          <Textarea
            value={learnings}
            onChange={(e) => setLearnings(e.target.value)}
          />
        </FormControl>

        <FormControl id="thoughts">
          <FormLabel>思考</FormLabel>
          <Textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
          />
        </FormControl>

        <FormControl id="tommorowsGoal">
          <FormLabel>明日の目標</FormLabel>
          <Input
            type="text"
            value={tommorowsGoal}
            onChange={(e) => setTommorowsGoal(e.target.value)}
          />
        </FormControl>
      <Button mt={4} onClick={handleUpdateReport}>
        更新
      </Button>
      <Button mt={4} onClick={handleDeleteReport}>削除</Button>
    </Box>
  );
};
