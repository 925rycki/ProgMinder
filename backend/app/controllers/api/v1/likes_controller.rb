class Api::V1::LikesController < ApplicationController
  def create
    if current_api_v1_user
      like = current_api_v1_user.likes.build(report_id: params[:report_id])
      if like.save
        render json: like, status: :created
      else
        render json: like.errors, status: :unprocessable_entity
      end
    else
      render json: { message: "ログインしてください" }, status: :unauthorized
    end
  end

  def destroy
    if current_api_v1_user
      like = Like.find_by(user_id: current_api_v1_user.id, report_id: params[:id])
      if like&.destroy
        render json: { message: "Like削除成功" }, status: :ok
      else
        render json: { message: "Like削除失敗" }, status: :not_found
      end
    else
      render json: { message: "ログインしてください" }, status: :unauthorized
    end
  end

end
