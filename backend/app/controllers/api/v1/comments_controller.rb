module Api
  module V1
    class CommentsController < ApplicationController
      def create
        if current_api_v1_user
          @comment = current_api_v1_user.comments.build(report_id: params[:report_id], content: params[:content])
          if @comment.save
            render 'create', status: :created
          else
            render 'errors', status: :unprocessable_entity
          end
        else
          render 'unauthorized', status: :unauthorized
        end
      end

      def destroy
        if current_api_v1_user
          @comment = Comment.find_by(user_id: current_api_v1_user.id, id: params[:id])
          if @comment&.destroy
            head :no_content
          else
            render 'not_found', status: :not_found
          end
        else
          render 'unauthorized', status: :unauthorized
        end
      end
    end
  end
end
