import { FC, useContext, useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  getReportDetail,
} from "../../lib/api/report";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../App";

export const ReportDetail: FC = () => {
  const { currentUser } = useContext(AuthContext);

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

  const [comment, setComment] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    getReportDetail(id).then((response) => {
      setCreatedDate(response.data.createdDate);
      setTodaysGoal(response.data.todaysGoal);
      setStudyTime(response.data.studyTime);
      setGoalReview(response.data.goalReview);
      setChallenges(response.data.challenges);
      setLearnings(response.data.learnings);
      setThoughts(response.data.thoughts);
      setTomorrowsGoal(response.data.tomorrowsGoal);
      setComments(response.data.comments);
    });
  }, []);

  const handleCreateComment = async () => {
    if (comment) {
      await createComment(id, comment);
      setComment("");
      getReportDetail(id).then((response) => {
        setCreatedDate(response.data.createdDate);
        setTodaysGoal(response.data.todaysGoal);
        setStudyTime(response.data.studyTime);
        setGoalReview(response.data.goalReview);
        setChallenges(response.data.challenges);
        setLearnings(response.data.learnings);
        setThoughts(response.data.thoughts);
        setTomorrowsGoal(response.data.tomorrowsGoal);
        setComments(response.data.comments);
      });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
    // Refetch the report details after a successful delete operation
    getReportDetail(id).then((response) => {
      setCreatedDate(response.data.createdDate);
      setTodaysGoal(response.data.todaysGoal);
      setStudyTime(response.data.studyTime);
      setGoalReview(response.data.goalReview);
      setChallenges(response.data.challenges);
      setLearnings(response.data.learnings);
      setThoughts(response.data.thoughts);
      setTomorrowsGoal(response.data.tomorrowsGoal);
      setComments(response.data.comments);
    });
  };

  return (
    <Box p={4}>
      <Text>CurrentUserのidは{currentUser?.id}</Text>
      <Text>id:{id}</Text>
      <Text>日付:{createdDate}</Text>
      <Text>本日の目標(TODO目標/できるようになりたいこと):{todaysGoal}</Text>
      <Text>学習時間:{studyTime}</Text>
      <Text>目標振り返り(TODO進捗/できるようになりたいこと振り返り):{goalReview}</Text>
      <Text>詰まっていること:{challenges}</Text>
      <Text>学んだこと(新しい気付き、学び):{learnings}</Text>
      <Text>感想(一日の感想、雑談):{thoughts}</Text>
      <Text>明日の目標(TODO目標/できるようになりたいこと):{tomorrowsGoal}</Text>
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="コメントを入力"
      />
      <Button onClick={handleCreateComment}>送信</Button>

      {comments.map((commentData, index) => (
        <Box key={index}>
          <Flex align="center">
            <Image borderRadius="full" boxSize="50px" src={commentData.user?.image?.url} alt="User image" />
            <Text fontWeight="bold" >{commentData.user?.name}</Text>
            <Text fontWeight="bold" >コメントのuser_id{commentData.comment?.userId}</Text>
            <Text>: {commentData.comment?.content}</Text>
            {currentUser?.id === commentData.comment?.userId && <Button onClick={() => handleDeleteComment(commentData.comment?.id)}>削除</Button>}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
