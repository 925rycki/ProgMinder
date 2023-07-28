class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :configure_permitted_parameters

  private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name, :image, :nickname, :bio)
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:account_update, keys: [:nickname, :image, :bio])
    end 
end
