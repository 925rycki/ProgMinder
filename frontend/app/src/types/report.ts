export type TimelineReportType = {
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
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  user: {
    nickname: string;
    image: {
      url: string;
    };
  };
};

export type ReportCreateType = {
  createdDate: string;
  todaysGoal: string;
  studyTime: number;
  goalReview: string;
  challenges: string;
  learnings: string;
  thoughts: string;
  tomorrowsGoal: string;
};

export type ReportDetailType = {
  report: {
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
      userId: number;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      id: number;
      name: string;
      image: {
        url: string;
      };
    };
  };
  comments: Array<{
    comment: {
      id: number;
      userId: number;
      reportId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      name: string;
      image: {
        url: string;
      };
    };
  }>;
};

export type ReportType = {
  id: number;
  createdDate: string;
  todaysGoal: string;
  studyTime: number;
  goalReview: string;
  challenges: string;
  learnings: string;
  thoughts: string;
  tomorrowsGoal: string;
}
