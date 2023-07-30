class Api::V1::LikesController < ApplicationController
  def create
    if current_api_v1_user
      @like = current_api_v1_user.likes.build(report_id: params[:report_id])
      if @like.save
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
      @like = Like.find_by(user_id: current_api_v1_user.id, report_id: params[:id])
      if @like&.destroy
        head :no_content
      else
        @message = "Like削除失敗"
        render 'destroy', status: :not_found
      end
    else
      @message = "ログインしてください"
      render 'destroy', status: :unauthorized
    end
  end
end
