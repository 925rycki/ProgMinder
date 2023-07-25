export type ReportType = {
  report: {
    id: number;
    createdDate: string;
    todaysGoal: string;
    studyTime: number;
    goalReview: string;
    challenges: string;
    learnings: string;
    thoughts: string;
    tomorrowsGoal: string;
  };
  likesCount: number;
  isLiked: boolean;
};
