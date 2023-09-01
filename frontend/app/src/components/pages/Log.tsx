import { FC, useContext, useEffect, useState } from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { TimelineReportType } from "../../types/report";
import {
  createLike,
  deleteLike,
  getCurrentUserReports,
} from "../../lib/api/report";
import { ReportCard } from "../organisms/cards/ReportCard";
import { AuthContext } from "../../App";
import { useMessage } from "../../hooks/useMessage";

export const Log: FC = () => {
  const [reports, setReports] = useState<TimelineReportType[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { showMessage } = useMessage();

  useEffect(() => {
    getCurrentUserReports().then((res) => {
      setReports(res.data);
    });
  }, []);

  const handleCreateLike = (id: number) => {
    if (!currentUser) {
      showMessage({ title: "サインインしてください", status: "error" });
      return;
    }

    createLike(id)
      .then(() => {
        setReports(
          reports.map((report) =>
            report.report.id === id
              ? { ...report, isLiked: true, likesCount: report.likesCount + 1 }
              : report
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDeleteLike = (id: number) => {
    deleteLike(id)
      .then(() => {
        setReports(
          reports.map((report) =>
            report.report.id === id
              ? { ...report, isLiked: false, likesCount: report.likesCount - 1 }
              : report
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      {reports.length === 0 ? (
        <Text mt={{ base: "60px", md: "90px" }}>
          学習記録を作成するとここに表示されます。
          <Text>
            上部メニューバーの
            <ChakraLink as={RouterLink} to="/report" color="blue.500">
              レポート
            </ChakraLink>
            をクリックして記録を作成してみましょう！
          </Text>
        </Text>
      ) : (
        <Box
          mx={{ base: 2, md: 32 }}
          mt={{ base: "75px", md: "100px" }}
          mb="25px"
        >
          {reports.map((data) => (
            <ReportCard
              key={data.report.id}
              data={data}
              handleCreateLike={handleCreateLike}
              handleDeleteLike={handleDeleteLike}
              onClick={() => navigate(`/logs/${data.report.id}`)}
            />
          ))}
        </Box>
      )}
    </>
  );
};
