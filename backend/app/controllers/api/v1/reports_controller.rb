module Api
  module V1
    class ReportsController < ApplicationController
      def index
        @reports = Report.includes(:likes, :comments, :user).order(created_at: :desc)
      end

      def create
        if current_api_v1_user
          @report = current_api_v1_user.reports.build(report_params)
          if @report.save
            render 'create', status: :created
          else
            render json: @report.errors, status: :unprocessable_entity
          end
        else
          render json: { message: "ユーザーが存在しません" }
        end
      end

      def show
        @report = Report.includes(comments: :user).find(params[:id])
      end
      
      def edit
        @report = Report.find(params[:id])
        if current_api_v1_user&.id == @report.user_id
          if @report.update(report_params)
            render 'update'
          else
            render json: @report.errors, status: :unprocessable_entity
          end
        else
          render json: { message: "このレポートの更新は許可されていません" }, status: :forbidden
        end
      end

      def destroy
        @report = Report.find(params[:id])
        if current_api_v1_user&.id == @report.user_id
          @report.destroy
          head :no_content
        else
          render json: { message: "このレポートの削除は許可されていません" }, status: :forbidden
        end
      end

      # 認証ユーザーに紐づくレポートを取得する
      def get_current_api_v1_user_reports
        if current_api_v1_user
          @user_reports = current_api_v1_user.reports
          render 'get_current_api_v1_user_reports'
        else
          render json: { message: "ログインしてください" }, status: :unauthorized
        end
      end

      private

      def report_params
        params.require(:report).permit(:created_date, :todays_goal, :study_time, :goal_review, :challenges, :learnings, :thoughts, :tomorrows_goal)
      end
    end
  end
end
