import { ReportType } from "../../types/report";
import client from "./client";

export const getReports = () => {
  return client.get("/reports");
};

export const createReport = (data: {
  report: {
    createdDate: string;
    todaysGoal: string;
    studyTime: number;
    goalReview: string;
    challenges: string;
    learnings: string;
    thoughts: string;
    tomorrowsGoal: string;
  };
}) => {
  return client.post("/reports", data);
};

export const updateReport = (id: number, data: Omit<ReportType, "likesCount" | "isLiked">) => {
  return client.put(`/reports/${id}`, data);
};

export const getUserReports = () => {
  return client.get("/user_reports");
};

export const getReportDetail = (id: number) => {
  return client.get(`/reports/${id}`);
};

export const deleteReport = (id: number) => {
  return client.delete(`/reports/${id}`);
};

export const createLike = (reportId: number) => {
  return client.post("/likes", { report_id: reportId });
};

export const deleteLike = (reportId: number) => {
  return client.delete(`/likes/${reportId}`);
};
