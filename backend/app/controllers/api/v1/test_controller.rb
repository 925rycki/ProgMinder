module Api
  module V1
    class TestController < ApplicationController
      def index
        render json: { message: 'Hello World!2' }
      end
    end
  end
end
