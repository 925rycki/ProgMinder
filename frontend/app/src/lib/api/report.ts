import { LogDetailType, ReportCreateType } from "../../types/report";
import client from "./client";

export const getReports = () => {
  return client.get("/reports");
};

export const createReport = (data: { report: ReportCreateType }) => {
  return client.post("/reports", data);
};

export const updateReport = (id: number, data: LogDetailType) => {
  return client.put(`/reports/${id}`, data);
};

export const getCurrentUserReports = () => {
  return client.get("/get_current_user_reports");
};

export const getReportDetail = (id: number) => {
  return client.get(`/reports/${id}`);
};

export const deleteReport = (id: number) => {
  return client.delete(`/reports/${id}`);
};

export const getUserInfo = (id: number) => {
  return client.get(`/get_user_info/${id}`);
};

export const getCurrentUserFollowInfo = () => {
  return client.get("/get_current_user_follow_info");
};

export const getFollowingUserReports = () => {
  return client.get(`/get_following_user_reports`);
};

export const getFollowingUsers = (id: number) => {
  return client.get(`/get_following_users/${id}`);
};

export const getFollowedUsers = (id: number) => {
  return client.get(`/get_followed_users/${id}`);
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

export const createFollow = (followedId: number) => {
  return client.post("/follows", { followed_id: followedId });
};

export const deleteFollow = (followedId: number) => {
  return client.delete(`/follows/${followedId}`);
};
