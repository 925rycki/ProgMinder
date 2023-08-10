module Api
  module V1
    class FollowsController < ApplicationController
      def create
        if current_api_v1_user
          @follow = current_api_v1_user.follower.build(followed_id: params[:followed_id])
          if @follow.save
            render 'create', status: :created
          else
            render 'create', status: :unprocessable_entity
          end
        else
          @message = "ログインしてください"
          render 'destroy', status: :unauthorized
        end
      end

      def destroy
        if current_api_v1_user
          @follow = Follow.find_by(follower_id: current_api_v1_user.id, followed_id: params[:id])
          if @follow&.destroy
            head :no_content
          else
            @message = "Follow削除失敗"
            render 'destroy', status: :not_found
          end
        else
          @message = "ログインしてください"
          render 'destroy', status: :unauthorized
        end
      end
    end
  end
end
