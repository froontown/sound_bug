Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:index, :show]
  match 'users/:id' => 'users#destroy', :via => :delete, :as => :admin_destroy_user

  resources :songs

  root "songs#index"
end
