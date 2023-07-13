module Api
  module V1
    class ReportsController < ApplicationController
      def index
        reports = Report.all
        render json: reports
      end

      def create
        if current_api_v1_user
          report = current_api_v1_user.reports.build(report_params)
          if report.save
            render json: report, status: :created
          else
            render json: report.errors, status: :unprocessable_entity
          end
        else
          render json: { message: "ユーザーが存在しません" }
        end
      end

      def update
        report = Report.find(params[:id])
        if current_api_v1_user&.id == report.user_id
          if report.update(report_params)
            render json: report
          else
            render json: report.errors, status: :unprocessable_entity
          end
        else
          render json: { message: "このレポートの更新は許可されていません" }, status: :forbidden
        end
      end

      def user_reports
        if current_api_v1_user
          user_reports = current_api_v1_user.reports
          render json: user_reports
        else
          render json: { message: "ログインしてください" }, status: :unauthorized
        end
      end

      private

      def report_params
        params.permit(:created_date, :todays_goal, :study_time, :goal_review, :challenges, :learnings, :thoughts, :tomorrows_goal)
      end
    end
  end
end
