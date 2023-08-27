import { FC } from "react";
import { TimelineReportType } from "../../../types/report";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

type Props = {
  data: TimelineReportType;
  handleCreateLike: (id: number) => void;
  handleDeleteLike: (id: number) => void;
};

export const ReportCard: FC<Props> = (props) => {
  const { data, handleCreateLike, handleDeleteLike } = props;
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("ja-JP", options);
  };

  return (
    <Card key={data.report.id} my={4} px={2} boxShadow="md">
      <CardBody>
        <Stack spacing={2}>
          <Flex
            align="center"
            onClick={() => navigate(`/user/${data.user.id}`)}
            cursor="pointer"
          >
            <Image
              mr={2}
              borderRadius="full"
              boxSize="50px"
              src={data.user?.image.url}
              alt="User image"
            />
            <Text fontWeight="bold">{data.user?.nickname}</Text>
            <Text fontWeight="bold" ml={4}>
              {formatDate(data.report.createdDate)}
            </Text>
          </Flex>

          <Box>
            <Text fontWeight="bold">本日の目標</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {data.report.todaysGoal}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">学習時間[h]</Text>
            <Text>{data.report.studyTime}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">目標振り返り</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {data.report.goalReview}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">詰まっていること</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {data.report.challenges}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">学んだこと</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {data.report.learnings}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">感想</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {data.report.thoughts}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">明日の目標</Text>
            <Text style={{ whiteSpace: "pre-line" }}>
              {data.report.tomorrowsGoal}
            </Text>
          </Box>

          <Flex>
            <Flex align="center" mr={4}>
              {data.isLiked ? (
                <AiFillLike
                  size="24px"
                  onClick={() => handleDeleteLike(data.report.id)}
                  cursor="pointer"
                />
              ) : (
                <AiOutlineLike
                  size="24px"
                  onClick={() => handleCreateLike(data.report.id)}
                  cursor="pointer"
                />
              )}
              <Text mx={1}>{data.likesCount}</Text>
            </Flex>
            <Flex align="center">
              <FaRegComment
                size="20px"
                onClick={() => navigate(`/reports/${data.report.id}`)}
                cursor="pointer"
              />
              <Text mx={1}>{data.commentsCount}</Text>
            </Flex>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
