module Api
  module V1
    class ReportsController < ApplicationController
      def index
        @reports = Report.includes(:likes, :comments, :user).order(created_at: :desc)
      end

      def show
        @report = Report.includes(comments: :user).find(params[:id])
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

      def current_user_follow_info
        if current_api_v1_user
          user_follow_info = {
            following_count: current_api_v1_user.follower.count,
            followers_count: current_api_v1_user.followed.count
          }
          render json: user_follow_info.to_json, status: :ok
        else
          render json: { message: "サインインしてください" }, status: :unauthorized
        end
      end

      # 認証ユーザーに紐づくレポートを取得する
      def current_user_reports
        if current_api_v1_user
          @user_reports = current_api_v1_user.reports.order(created_at: :desc)
        else
          render json: { message: "サインインしてください" }, status: :unauthorized
        end
      end

      # 特定のユーザーに紐づく情報を取得する
      def get_user_info
        @user = User.find(params[:id])
        @user_reports = @user.reports.order(created_at: :desc)
        @is_followed = current_api_v1_user&.following?(@user)
      end

      # 認証ユーザーがフォローしているユーザーのレポートを取得する
      def get_following_user_reports
        if current_api_v1_user
          following_users_ids = current_api_v1_user.follower.map(&:followed_id)
          @reports = Report.includes(:likes, :comments, :user)
                           .where(user_id: following_users_ids)
                           .order(created_at: :desc)
        else
          render json: { message: "サインインしてください" }, status: :unauthorized
        end
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
