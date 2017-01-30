class Users < ApplicationRecord
  def index
    if !current_user.admin?
      flash[:notice] = "You don't have permission to access this page!"
      redirect_to songs_path
    end
    @users = User.all
  end

  def show
    @users = current_user
  end

  def destroy
    @user = User.find(params[:id])
    if current_user.admin?
      @user.destroy
      redirect_to '/users'
    else
      flash[:notice] = 'You do not have permission to delete users!'
      redirect_to '/'
    end
  end
end
