import { FC, useContext, useState } from "react";
import { createReport } from "../../lib/api/report";
import { Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, Textarea } from "@chakra-ui/react";
import { AuthContext } from "../../App";

export const Report: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const [createdDate, setCreatedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [todaysGoal, setTodaysGoal] = useState<string>("");
  const [studyTime, setStudyTime] = useState<number>(0);
  const [goalReview, setGoalReview] = useState<string>("");
  const [challenges, setChallenges] = useState<string>("");
  const [learnings, setLearnings] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [tommorowsGoal, setTommorowsGoal] = useState<string>("");

  const handleCreateReport = async () => {
    const response = await createReport({
      createdDate: createdDate,
      todaysGoal: todaysGoal,
      studyTime: studyTime,
      goalReview: goalReview,
      challenges: challenges,
      learnings: learnings,
      thoughts: thoughts,
      tomorrowsGoal: tommorowsGoal,
    });

    setCreatedDate(new Date().toISOString().split('T')[0]);
    setTodaysGoal("");
    setStudyTime(0);
    setGoalReview("");
    setChallenges("");
    setLearnings("");
    setThoughts("");
    setTommorowsGoal("");
  }

  return (
    <>
    <h1>こんにちは、{currentUser?.name}さん！</h1>

    <Box p={4}>
      <FormControl id="createdDate">
        <FormLabel>作成日</FormLabel>
        <Input type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
      </FormControl>

      <FormControl id="todaysGoal">
        <FormLabel>今日の目標</FormLabel>
        <Input type="text" value={todaysGoal} onChange={(e) => setTodaysGoal(e.target.value)} />
      </FormControl>

      <FormControl id="studyTime">
        <FormLabel>勉強時間</FormLabel>
        <NumberInput value={studyTime} onChange={(valueString) => setStudyTime(Number(valueString))} precision={2} min={0}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl id="goalReview">
        <FormLabel>目標レビュー</FormLabel>
        <Textarea value={goalReview} onChange={(e) => setGoalReview(e.target.value)} />
      </FormControl>

      <FormControl id="challenges">
        <FormLabel>課題</FormLabel>
        <Textarea value={challenges} onChange={(e) => setChallenges(e.target.value)} />
      </FormControl>

      <FormControl id="learnings">
        <FormLabel>学び</FormLabel>
        <Textarea value={learnings} onChange={(e) => setLearnings(e.target.value)} />
      </FormControl>

      <FormControl id="thoughts">
        <FormLabel>思考</FormLabel>
        <Textarea value={thoughts} onChange={(e) => setThoughts(e.target.value)} />
      </FormControl>

      <FormControl id="tommorowsGoal">
        <FormLabel>明日の目標</FormLabel>
        <Input type="text" value={tommorowsGoal} onChange={(e) => setTommorowsGoal(e.target.value)} />
      </FormControl>

      <Button onClick={handleCreateReport} mt={4}>
        送信
      </Button>
    </Box>
    </>
  );
};
