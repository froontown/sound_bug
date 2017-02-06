Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:index, :show]
  match 'users/:id' => 'users#destroy', :via => :delete, :as => :admin_destroy_user

  resources :songs, only: [:index, :show, :create, :edit, :update, :destroy] do
    resources :comments, only: [:index, :new, :create, :edit, :update, :destroy]
  end

  root "songs#index"

  namespace :api do
    namespace :v1 do
      resources :songs do
        post '/up_vote' => 'votes#up_vote', as: :up_vote
        post '/down_vote' => 'votes#down_vote', as: :down_vote
      end
    end
  end
end
