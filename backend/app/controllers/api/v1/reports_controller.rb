module Api
  module V1
    class ReportsController < ApplicationController
      before_action :set_report, only: [:show, :update, :destroy]
      before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy, :current_user_reports, :current_user_follow_info, :following_user_reports]

      def index
        @reports = Report.includes(:likes, :comments, :user).order(created_at: :desc)
      end

      def show; end

      def create
        @report = current_api_v1_user.reports.build(report_params)
        if @report.save
          render 'create', status: :created
        else
          render json: @report.errors, status: :unprocessable_entity
        end
      end

      def update
        if authorized_user?(@report.user)
          if @report.update(report_params)
            render 'update'
          else
            render json: @report.errors, status: :unprocessable_entity
          end
        else
          render status: :unauthorized
        end
      end

      def destroy
        if authorized_user?(@report.user)
          @report.destroy
          head :no_content
        else
          render json: { message: "許可されていないユーザーです" }, status: :unauthorized
        end
      end

      def current_user_follow_info
        user_follow_info = {
          following_count: current_api_v1_user.follower.count,
          followers_count: current_api_v1_user.followed.count
        }
        render json: user_follow_info.to_json, status: :ok
      end

      # 認証ユーザーに紐づくレポートを取得する
      def current_user_reports
        @user_reports = current_api_v1_user.reports.order(created_at: :desc)
      end

      # 特定のユーザーに紐づく情報を取得する
      def user_info
        @user = User.find(params[:id])
        @user_reports = @user.reports.order(created_at: :desc)
        @is_followed = current_api_v1_user&.following?(@user)
      end

      # 認証ユーザーがフォローしているユーザーのレポートを取得する
      def following_user_reports
        following_users_ids = current_api_v1_user.follower.map(&:followed_id)
        @reports = Report.includes(:likes, :comments, :user)
                         .where(user_id: following_users_ids)
                         .order(created_at: :desc)
      end

      # フォローしているユーザーを取得する
      def following_users
        user = User.find(params[:id])
        @following_users = user.follower.map(&:followed)
      rescue ActiveRecord::RecordNotFound
        render json: { message: "ユーザーが存在しません" }, status: :not_found
      end

      # フォローされているユーザーを取得する
      def followed_users
        user = User.find(params[:id])
        @followed_users = user.followed.map(&:follower)
      rescue ActiveRecord::RecordNotFound
        render json: { message: "ユーザーが存在しません" }, status: :not_found
      end

      private

      def set_report
        @report = Report.includes(comments: :user).find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "レポートが存在しません" }, status: :not_found
      end

      def authenticate_user!
        render json: { message: "サインインしてください" }, status: :unauthorized unless current_api_v1_user
      end

      def authorized_user?(user)
        current_api_v1_user&.id == user.id
      end

      def report_params
        params.require(:report).permit(
          :created_date,
          :todays_goal,
          :study_time,
          :goal_review,
          :challenges,
          :learnings,
          :thoughts,
          :tomorrows_goal
        )
      end
    end
  end
end
