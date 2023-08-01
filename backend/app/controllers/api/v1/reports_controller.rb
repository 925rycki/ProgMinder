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
      
      def update
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
      def get_current_user_reports
        if current_api_v1_user
          @user_reports = current_api_v1_user.reports
          render 'get_current_api_v1_user_reports'
        else
          render json: { message: "ログインしてください" }, status: :unauthorized
        end
      end

      # 特定のユーザーに紐づく情報を取得する
      def get_user_info
        user = User.find(params[:id])
        user_reports = user.reports.order(created_at: :desc)
      
        is_followed = false
        if current_api_v1_user && current_api_v1_user.following?(user)
          is_followed = true
        end
      
        user_data = {
          nickname: user.nickname,
          image: user.image,
          bio: user.bio,
          following_count: user.follower.count,
          followers_count: user.followed.count,
          reports: user_reports,
          is_followed: is_followed
        }
        render json: user_data.to_json, status: :ok
      end
      


      private

      def report_params
        params.require(:report).permit(
          :created_date,
          :todays_goal,
          :study_time,
          :goal_review,
          :challenges,
          :learnings,
          :thoughts,
          :tomorrows_goal)
      end
    end
  end
end
