Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: [:index]
      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: [:index]
      end

      resources :reports, only: [:index, :create]
    end
  end
end
