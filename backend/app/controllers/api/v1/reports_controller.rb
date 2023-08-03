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

      def get_current_user_follow_info
        if current_api_v1_user
          user_follow_info = {
            following_count: current_api_v1_user.follower.count,
            followers_count: current_api_v1_user.followed.count,
          }
      
          render json: user_follow_info.to_json, status: :ok
        else
          render json: { message: "サインインしてください" }, status: :unauthorized
        end
      end      

      # 認証ユーザーに紐づくレポートを取得する
      def get_current_user_reports
        if current_api_v1_user
          @user_reports = current_api_v1_user.reports
          render 'get_current_api_v1_user_reports'
        else
          render json: { message: "サインインしてください" }, status: :unauthorized
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
          id: user.id,
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
      
      # 認証ユーザーがフォローしているユーザーのレポートを取得する
      def get_following_user_reports
        if current_api_v1_user
          following_users_ids = current_api_v1_user.follower.map(&:followed_id)
          @reports = Report.includes(:likes, :comments, :user)
                           .where(user_id: following_users_ids)
                           .order(created_at: :desc)
          
          data = @reports.map do |report|
            {
              report: report,
              likes_count: report.likes.count,
              is_liked: report.likes.exists?(user_id: current_api_v1_user.id),
              comments_count: report.comments.count,
              user: {
                id: report.user.id,
                nickname: report.user.nickname,
                image: report.user.image
              }
            }
          end
          render json: data.to_json, status: :ok
        else
          render json: { message: "サインインしてください" }, status: :unauthorized
        end
      end

      # フォローしているユーザーを取得する
      def get_following_users
        user = User.find(params[:id])
      
        following_users = user.follower.map(&:followed)
      
        data = following_users.map do |following_user|
          {
            id: following_user.id,
            name: following_user.name,
            nickname: following_user.nickname,
            image: following_user.image,
            bio: following_user.bio
          }
        end
      
        render json: data.to_json, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { message: "ユーザーが存在しません" }, status: :not_found
      end

      # フォローされているユーザーを取得する
      def get_followed_users
        user = User.find(params[:id])

        followed_users = user.followed.map(&:follower)

        data = followed_users.map do |followed_user|
          {
            id: followed_user.id,
            name: followed_user.name,
            nickname: followed_user.nickname,
            image: followed_user.image,
            bio: followed_user.bio
          }
        end

        render json: data.to_json, status: :ok
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
          :tomorrows_goal)
      end
    end
  end
end
