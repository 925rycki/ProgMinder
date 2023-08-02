import { FC, useEffect, useState } from "react";
import { LogDetailType } from "../../types/report";
import {
  deleteReport,
  getReportDetail,
  updateReport,
} from "../../lib/api/report";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { DangerButton } from "../atoms/button/DangerButton";
import { useMessage } from "../../hooks/useMessage";

export const LogDetail: FC = () => {
  const [createdDate, setCreatedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [todaysGoal, setTodaysGoal] = useState<string>("");
  const [studyTime, setStudyTime] = useState<number>(0);
  const [goalReview, setGoalReview] = useState<string>("");
  const [challenges, setChallenges] = useState<string>("");
  const [learnings, setLearnings] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [tomorrowsGoal, setTomorrowsGoal] = useState<string>("");

  const navigate = useNavigate();

  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  const { showMessage } = useMessage();

  useEffect(() => {
    getReportDetail(id).then((response) => {
      setCreatedDate(response.data.report.report.createdDate);
      setTodaysGoal(response.data.report.report.todaysGoal);
      setStudyTime(response.data.report.report.studyTime);
      setGoalReview(response.data.report.report.goalReview);
      setChallenges(response.data.report.report.challenges);
      setLearnings(response.data.report.report.learnings);
      setThoughts(response.data.report.report.thoughts);
      setTomorrowsGoal(response.data.report.report.tomorrowsGoal);
    });
  }, []);

  const handleUpdateReport = async () => {
    const updatedReport: LogDetailType = {
      id: id,
      createdDate: createdDate,
      todaysGoal: todaysGoal,
      studyTime: studyTime,
      goalReview: goalReview,
      challenges: challenges,
      learnings: learnings,
      thoughts: thoughts,
      tomorrowsGoal: tomorrowsGoal,
    };

    try {
      await updateReport(id, updatedReport);
      showMessage({ title: "更新しました", status: "success" });
      navigate("/log");
    } catch (error) {
      showMessage({ title: "更新に失敗しました", status: "error" });
      console.error("Error updating the report: ", error);
    }
  };

  const handleDeleteReport = async () => {
    if (window.confirm("本当に削除しますか？")) {
      await deleteReport(id);
      navigate("/log");
    }
  };

  return (
    <Box p={4}>
        <Stack spacing={4} py={4} px={10}>

      <FormControl id="createdDate">
        <FormLabel>日付</FormLabel>
        <Input
          type="date"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
        />
      </FormControl>
      <FormControl id="todaysGoal">
        <FormLabel>本日の目標</FormLabel>
        <Textarea
          value={todaysGoal}
          onChange={(e) => setTodaysGoal(e.target.value)}
        />
      </FormControl>
      <FormControl id="studyTime">
        <FormLabel>学習時間(Hour)</FormLabel>
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
        <FormLabel>
          目標振り返り(TODO進捗/できるようになりたいこと振り返り)
        </FormLabel>
        <Textarea
          value={goalReview}
          onChange={(e) => setGoalReview(e.target.value)}
        />
      </FormControl>

      <FormControl id="challenges">
        <FormLabel>
          詰まっていること(実現したいこと/現状/行ったこと/仮説)
        </FormLabel>
        <Textarea
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
        />
      </FormControl>

      <FormControl id="learnings">
        <FormLabel>学んだこと(新しい気付き、学び)</FormLabel>
        <Textarea
          value={learnings}
          onChange={(e) => setLearnings(e.target.value)}
        />
      </FormControl>

      <FormControl id="thoughts">
        <FormLabel>感想(一日の感想、雑談)</FormLabel>
        <Textarea
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
        />
      </FormControl>

      <FormControl id="tomorrowsGoal">
        <FormLabel>明日の目標(TODO目標/できるようになりたいこと)</FormLabel>
        <Textarea
          value={tomorrowsGoal}
          onChange={(e) => setTomorrowsGoal(e.target.value)}
        />
      </FormControl>
      <VStack mt={4}>
        <PrimaryButton onClick={handleUpdateReport}>更新</PrimaryButton>
        <DangerButton onClick={handleDeleteReport}>削除</DangerButton>
      </VStack>
      </Stack>
    </Box>
  );
};
