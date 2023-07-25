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

      resources :reports, only: [:index, :create, :update, :show, :destroy]
      resources :likes, only: [:create]
      delete '/likes/:id', to: 'likes#destroy'

      get '/user_reports', to: 'reports#user_reports'
    end
  end
end
