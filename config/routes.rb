Rails.application.routes.draw do
  devise_for :users #, controllers: { registrations: 'registrations', sessions: 'sessions' }
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :trades
    end
  end
  
  get '*path', to: 'pages#index', via: :all
end