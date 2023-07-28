import { FC, useState } from "react";
import { createReport } from "../../lib/api/report";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";
import { useNavigate } from "react-router-dom";

export const Report: FC = () => {
  const navigate = useNavigate();
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

  const [todaysGoalCount, setTodaysGoalCount] = useState<number>(0);

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
      navigate("/timeline")
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

  const handleTodaysGoalChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setTodaysGoal(value);
      setTodaysGoalCount(value.length);
    }
  };

  return (
    <>
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
          <FormLabel>本日の目標 ({todaysGoalCount}/255)</FormLabel>
          <Textarea
            value={todaysGoal}
            onChange={handleTodaysGoalChange}
            placeholder="TODO目標/できるようになりたいこと"
          />
        </FormControl>

        <FormControl id="studyTime">
          <FormLabel>学習時間（時）</FormLabel>
          <NumberInput
            value={studyTime}
            onChange={(valueString) => setStudyTime(Number(valueString))}
            precision={2}
            min={0}
            max={24}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="goalReview">
          <FormLabel>
            目標振り返り
          </FormLabel>
          <Textarea
            value={goalReview}
            onChange={(e) => setGoalReview(e.target.value)}
            placeholder="TODO進捗/できるようになりたいこと振り返り"
          />
        </FormControl>

        <FormControl id="challenges">
          <FormLabel>
            詰まっていること
          </FormLabel>
          <Textarea
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            placeholder="実現したいこと/現状/行ったこと/仮説"
          />
        </FormControl>

        <FormControl id="learnings">
          <FormLabel>学んだこと</FormLabel>
          <Textarea
            value={learnings}
            onChange={(e) => setLearnings(e.target.value)}
            placeholder="新しい気付き、学び"
          />
        </FormControl>

        <FormControl id="thoughts">
          <FormLabel>感想</FormLabel>
          <Textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            placeholder="一日の感想、雑談"
          />
        </FormControl>

        <FormControl id="tomorrowsGoal">
          <FormLabel>明日の目標</FormLabel>
          <Textarea
            value={tomorrowsGoal}
            onChange={(e) => setTomorrowsGoal(e.target.value)}
            placeholder="TODO目標/できるようになりたいこと"
          />
        </FormControl>
        <Center mt={5}>
          <PrimaryButton onClick={handleCreateReport}>日報作成</PrimaryButton>
        </Center>
      </Box>
    </>
  );
};
