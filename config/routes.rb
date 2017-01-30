Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:index, :show]
  match 'users/:id' => 'users#destroy', :via => :delete, :as => :admin_destroy_user

  resources :songs, only: [:index, :show, :create, :edit, :update]

  root "songs#index"
end
