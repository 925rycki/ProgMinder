import { FC, useState } from "react";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { createReport } from "../../lib/api/report";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";

export const Report: FC = () => {
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
  const [goalReviewCount, setGoalReviewCount] = useState<number>(0);
  const [challengesCount, setChallengesCount] = useState<number>(0);
  const [learningsCount, setLearningsCount] = useState<number>(0);
  const [thoughtsCount, setThoughtsCount] = useState<number>(0);
  const [tomorrowsGoalCount, setTomorrowsGoalCount] = useState<number>(0);

  const navigate = useNavigate();

  const { showMessage } = useMessage();

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
      navigate("/timeline");
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

  const handleTodaysGoalChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setTodaysGoal(value);
      setTodaysGoalCount(value.length);
    }
  };

  const handleGoalReviewChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setGoalReview(value);
      setGoalReviewCount(value.length);
    }
  };

  const handleChallengesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setChallenges(value);
      setChallengesCount(value.length);
    }
  };

  const handleLearningsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setLearnings(value);
      setLearningsCount(value.length);
    }
  };

  const handleThoughtsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setThoughts(value);
      setThoughtsCount(value.length);
    }
  };

  const handleTomorrowsGoalChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 255) {
      setTomorrowsGoal(value);
      setTomorrowsGoalCount(value.length);
    }
  };

  return (
    <>
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
            <FormLabel>本日の目標 ({todaysGoalCount}/255)</FormLabel>
            <Textarea
              value={todaysGoal}
              onChange={handleTodaysGoalChange}
              placeholder="TODO目標/できるようになりたいこと"
            />
          </FormControl>

          <FormControl id="studyTime">
            <FormLabel>学習時間[h]</FormLabel>
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
            <FormLabel>目標振り返り<span style={{ color: 'red' }}>*</span>({goalReviewCount}/255)</FormLabel>
            <Textarea
              value={goalReview}
              onChange={handleGoalReviewChange}
              placeholder="TODO進捗/できるようになりたいこと振り返り"
            />
          </FormControl>

          <FormControl id="challenges">
            <FormLabel>詰まっていること({challengesCount}/255)</FormLabel>
            <Textarea
              value={challenges}
              onChange={handleChallengesChange}
              placeholder="実現したいこと/現状/行ったこと/仮説"
            />
          </FormControl>

          <FormControl id="learnings">
            <FormLabel>学んだこと({learningsCount}/255)</FormLabel>
            <Textarea
              value={learnings}
              onChange={handleLearningsChange}
              placeholder="新しい気付き、学び"
            />
          </FormControl>

          <FormControl id="thoughts">
            <FormLabel>感想({thoughtsCount}/255)</FormLabel>
            <Textarea
              value={thoughts}
              onChange={handleThoughtsChange}
              placeholder="一日の感想、雑談"
            />
          </FormControl>

          <FormControl id="tomorrowsGoal">
            <FormLabel>明日の目標({tomorrowsGoalCount}/255)</FormLabel>
            <Textarea
              value={tomorrowsGoal}
              onChange={handleTomorrowsGoalChange}
              placeholder="TODO目標/できるようになりたいこと"
            />
          </FormControl>
          <Center mt={5}>
            <PrimaryButton
              onClick={handleCreateReport}
              isDisabled={!goalReview}
            >
              日報作成
            </PrimaryButton>
          </Center>
        </Stack>
      </Box>
    </>
  );
};
