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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

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
  const [tomorrowsGoal, setTomorrowsGoal] = useState<string>("");

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
      setTomorrowsGoal(response.data.tomorrowsGoal);
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
      tomorrowsGoal: tomorrowsGoal,
    };
    await updateReport(id, updatedReport);
    navigate("/log");
  };

  const handleDeleteReport = async () => {
    await deleteReport(id);
    navigate("/log");
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
      <PrimaryButton onClick={handleUpdateReport}>更新</PrimaryButton>
      <PrimaryButton onClick={handleDeleteReport}>削除</PrimaryButton>
    </Box>
  );
};
