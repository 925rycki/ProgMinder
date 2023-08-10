FactoryBot.define do
  factory :report do
    created_date { "2023-01-01" }
    todays_goal { "Sample todays goal" }
    study_time { 1 }
    goal_review { "Sample goal review" }
    challenges { "Sample challenges" }
    learnings { "Sample learnings" }
    thoughts { "Sample thoughts" }
    tomorrows_goal { "Sample tomorrow goal" }
    user
  end
end
