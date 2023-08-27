import { FC, useContext, useEffect, useState } from "react";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import { createLike, deleteLike, getReports } from "../../lib/api/report";
import { TimelineReportType } from "../../types/report";
import { useMessage } from "../../hooks/useMessage";
import { AuthContext } from "../../App";
import { ReportCard } from "../organisms/cards/ReportCard";

export const Timeline: FC = () => {
  const [reports, setReports] = useState<TimelineReportType[]>([]);
  const { currentUser } = useContext(AuthContext);

  const { showMessage } = useMessage();

  useEffect(() => {
    getReports().then((res) => setReports(res.data));
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
        <Center height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text ml={2}>Loading...</Text>
        </Center>
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
            />
          ))}
        </Box>
      )}
    </>
  );
};
