class Api::V1::ReportsController < ApplicationController
  def index
    reports = Report.all
  end

  def create
    if current_api_v1_user
      report = current_api_v1_user.reports.new(report_params)
      if report.save
        render json: report, status: :created
      else
        render json: report.errors, status: :unprocessable_entity
      end
    else
      render json: { message: "ユーザーが存在しません" }
    end
  end

  private

  def post_params
    params.require(:report).permit(:todays_goal, :study_time, :goal_review, :challenges, :learnings, :thoughts, :tommorow_goal, :user_id)
  end
end
