import { FC, useContext, useState } from "react";
import { createReport } from "../../lib/api/report";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import { AuthContext } from "../../App";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";

export const Report: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const { showMessage } = useMessage();

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

  const handleCreateReport = async () => {
    try {
      await createReport({
        report: {
          createdDate: createdDate,
          todaysGoal: todaysGoal,
          studyTime: studyTime,
          goalReview: goalReview,
          challenges: challenges,
          learnings: learnings,
          thoughts: thoughts,
          tomorrowsGoal: tomorrowsGoal,
        },
      });

      showMessage({ title: "Good job!", status: "success" });
    } catch (error) {
      showMessage({ title: "日報の作成に失敗しました", status: "error" });
      console.error(error);
      return;
    }

    setCreatedDate(new Date().toISOString().split("T")[0]);
    setTodaysGoal("");
    setStudyTime(0);
    setGoalReview("");
    setChallenges("");
    setLearnings("");
    setThoughts("");
    setTomorrowsGoal("");
  };

  return (
    <>
      <h1>こんにちは、{currentUser?.name}さん！</h1>

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
          <Input
            type="text"
            value={todaysGoal}
            onChange={(e) => setTodaysGoal(e.target.value)}
          />
        </FormControl>

        <FormControl id="studyTime">
          <FormLabel>学習時間</FormLabel>
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

        <PrimaryButton onClick={handleCreateReport}>日報作成</PrimaryButton>
      </Box>
    </>
  );
};
