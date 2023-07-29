import { ReportCreateType, ReportType } from "../../types/report";
import client from "./client";

export const getReports = () => {
  return client.get("/reports");
};

export const createReport = (data: { report: ReportCreateType }) => {
  return client.post("/reports", data);
};

export const updateReport = (
  id: number,
  data: Omit<ReportType, "likesCount" | "isLiked" | "commentsCount" | "user">
) => {
  return client.put(`/reports/${id}`, data);
};

export const getUserReports = () => {
  return client.get("/get_current_api_v1_user_reports");
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

export const createComment = (reportId: number, content: string) => {
  return client.post("/comments", { report_id: reportId, content: content });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};
