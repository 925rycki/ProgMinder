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
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :destroy]
      resources :follows, only: [:create, :destroy]

      get '/get_current_user_follow_info', to: 'reports#get_current_user_follow_info'
      get '/get_current_user_reports', to: 'reports#get_current_user_reports'
      get '/get_user_info/:id', to: 'reports#get_user_info'
      get '/get_following_user_reports', to: 'reports#get_following_user_reports'
      get '/get_following_users/:id', to: 'reports#get_following_users'
      get '/get_followed_users/:id', to: 'reports#get_followed_users'
    end
  end
end
