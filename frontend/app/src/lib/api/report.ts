import { ReportType } from "../../types/report";
import client from "./client";

export const getReports = () => {
  return client.get("/reports");
};

export const createReport = (data: ReportType) => {
  return client.post("/reports", data);
};
