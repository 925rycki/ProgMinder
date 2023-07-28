class Api::V1::CommentsController < ApplicationController
  def create
    if current_api_v1_user
      comment = current_api_v1_user.comments.build(report_id: params[:report_id], content: params[:content])
      if comment.save
        render json: comment, status: :created
      else
        render json: comment.errors, status: :unprocessable_entity
      end
    else
      render json: { message: "ログインしてください" }, status: :unauthorized
    end
  end

  def destroy
    if current_api_v1_user
      comment = Comment.find_by(user_id: current_api_v1_user.id, id: params[:id])
      if comment&.destroy
        render json: { message: "コメント削除成功" }, status: :ok
      else
        render json: { message: "コメント削除失敗" }, status: :not_found
      end
    else
      render json: { message: "ログインしてください" }, status: :unauthorized
    end
  end
end
