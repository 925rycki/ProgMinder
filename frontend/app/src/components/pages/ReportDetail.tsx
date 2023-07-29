import { FC, useContext, useEffect, useState } from "react";
import { Box, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import {
  createComment,
  deleteComment,
  getReportDetail,
} from "../../lib/api/report";
import { ReportDetailType } from "../../types/report";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { DangerButton } from "../atoms/button/DangerButton";

export const ReportDetail: FC = () => {
  const [report, setReport] = useState<ReportDetailType>();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ReportDetailType["comments"]>([]);

  const { currentUser } = useContext(AuthContext);

  const idString = useParams<{ id: string }>().id;
  const id = Number(idString);

  useEffect(() => {
    getReportDetail(id).then((res) => {
      setReport(res.data);
      setComments(res.data.comments);
      console.log(res.data);
    });
  }, []);

  const handleCreateComment = async () => {
    if (currentUser && comment) {
      try {
        const res = await createComment(id, comment);
        const newComment: ReportDetailType["comments"][0] = {
          comment: {
            id: res.data.id,
            userId: res.data.userId,
            reportId: res.data.reportId,
            content: res.data.content,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
          },
          user: {
            name: currentUser.name,
            image: {
              url: currentUser.image.url,
            },
          },
        };
        setComment("");
        setComments((prevComments) => [...prevComments, newComment]);
      } catch (error) {
        console.error("コメントを投稿できません。", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment?.id !== commentId)
      );
    } catch (error) {
      console.error("コメントを削除できません。", error);
    }
  };

  return (
    <Box p={4}>
      {report && (
        <>
      <Box bg="white" p={4} borderRadius="md" shadow="md">
          <Stack spacing={4} py={4} px={10}>
            <Flex align="center">
              <Image
                borderRadius="full"
                boxSize="50px"
                src={report.report.user?.image?.url}
                alt="User image"
              />
              <Text ml={4} fontWeight="bold">
              {report.report.user?.name}
              </Text>
            </Flex>
            <Text>
              日付:
              {new Date(report.report.report.createdDate).toLocaleDateString(
                "ja-JP",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </Text>
            <Text>
              本日の目標(TODO目標/できるようになりたいこと):<br />
              {report.report.report.todaysGoal}
            </Text>
            <Text>学習時間:{report.report.report.studyTime}</Text>
            <Text>
              目標振り返り(TODO進捗/できるようになりたいこと振り返り):<br />
              {report.report.report.goalReview}
            </Text>
            <Text>詰まっていること:<br />{report.report.report.challenges}</Text>
            <Text>
              学んだこと(新しい気付き、学び):<br />{report.report.report.learnings}
            </Text>
            <Text>感想(一日の感想、雑談):<br />{report.report.report.thoughts}</Text>
            <Text>
              明日の目標(TODO目標/できるようになりたいこと):<br />
              {report.report.report.tomorrowsGoal}
            </Text>
          </Stack>
          </Box>
        </>
      )}
      <Flex align="center" my={4}>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力"
          mr={2}
        />
        <PrimaryButton onClick={handleCreateComment}>送信</PrimaryButton>
      </Flex>

      {comments.map((commentData, index) => (
        <Box key={index}>
          <Flex align="center">
            <Image
              borderRadius="full"
              boxSize="50px"
              src={commentData.user?.image?.url}
              alt="User image"
            />
            <Text fontWeight="bold">{commentData.user?.name}</Text>
            <Text mx={2}>: {commentData.comment?.content}</Text>
            {currentUser?.id === commentData.comment?.userId && (
              <DangerButton
                onClick={() => handleDeleteComment(commentData.comment?.id)}
              >
                削除
              </DangerButton>
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
