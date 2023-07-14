import { ReportType } from "../../types/report";
import client from "./client";

export const getReports = () => {
  return client.get("/reports");
};

export const createReport = (data: ReportType) => {
  return client.post("/reports", data);
};

export const updateReport = (id: number, data: ReportType) => {
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
}
