import { FC, useEffect, useState } from "react";
import { ReportType } from "../../types/report";
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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { DangerButton } from "../atoms/button/DangerButton";

export const LogDetail: FC = () => {
  // const [report, setReport] = useState<ReportType>();
  type ReportUpdateType = Omit<ReportType, "likesCount" | "isLiked">;

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
  const [tomorrowsGoal, setTomorrowsGoal] = useState<string>("");

  // useEffect(() => {
  //   getReportDetail(id).then((response) => setReport(response.data));
  // }, []);

  useEffect(() => {
    getReportDetail(id).then((response) => {
      // setReport(response.data);
      setCreatedDate(response.data.report.createdDate);
      setTodaysGoal(response.data.report.todaysGoal);
      setStudyTime(response.data.report.studyTime);
      setGoalReview(response.data.report.goalReview);
      setChallenges(response.data.report.challenges);
      setLearnings(response.data.report.learnings);
      setThoughts(response.data.report.thoughts);
      setTomorrowsGoal(response.data.report.tomorrowsGoal);
    });
  }, []);

  // const handleUpdateReport = async () => {
  //   const updatedReport: ReportUpdateType = {
  //     report: {
  //       id: id,
  //       createdDate: createdDate,
  //       todaysGoal: todaysGoal,
  //       studyTime: studyTime,
  //       goalReview: goalReview,
  //       challenges: challenges,
  //       learnings: learnings,
  //       thoughts: thoughts,
  //       tomorrowsGoal: tomorrowsGoal,
  //     },
  //   };
  //   await updateReport(id, updatedReport);
  //   navigate("/log");
  // };

  // const handleDeleteReport = async () => {
  //   await deleteReport(id);
  //   navigate("/log");
  // };

  const handleDeleteReport = async () => {
    if (window.confirm("本当に削除しますか？")) {
      await deleteReport(id);
      navigate("/log");
    }
  };

  return (
    <Box p={4}>
      <FormControl id="createdDate">
        <FormLabel>日付</FormLabel>
        <Input
          type="date"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
        />
      </FormControl>
      <FormControl id="todaysGoal">
        <FormLabel>本日の目標(TODO目標/できるようになりたいこと)</FormLabel>
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
        <Input
          type="text"
          value={tomorrowsGoal}
          onChange={(e) => setTomorrowsGoal(e.target.value)}
        />
      </FormControl>
      <VStack mt={4}>
        {/* <PrimaryButton onClick={handleUpdateReport}>更新</PrimaryButton> */}
        <DangerButton onClick={handleDeleteReport}>削除</DangerButton>
      </VStack>
    </Box>
  );
};
