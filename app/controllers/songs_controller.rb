class SongsController < ApplicationController

  def index
    if params[:term]
      @songs = Song.search(params[:term])
    else
      @songs = Song.all
    end
    @song = Song.new
  end

  def show
    @user = current_user
    @song = Song.find(params[:id])
    @comments = @song.comments
  end

  def create
    @user = current_user
    @song = Song.new(song_params)
    @song.user = current_user

    if @song.save
      flash[:notice] = "Song created successfully!"
      redirect_to @song
    else
      @songs = Song.all
      flash.now[:notice] = @song.errors.full_messages.to_sentence
      render :index
    end
  end

  def edit
    @song = Song.find(params[:id])
    @user = current_user
    if @user.id == @song.user_id || @user.admin?
      render :edit
    else
      flash[:notice] = "You don't have permission to edit this song!"
      redirect_to @song
    end
  end

  def update
    @song = Song.find(params[:id])

    if @song.update(song_params)
      redirect_to song_path
    else
      flash[:notice] = @song.errors.full_messages.to_sentence
      render :edit
    end
  end

  def destroy
    @song = Song.find(params[:id])
    @user = current_user

    if @user.id == @song.user_id || @user.admin?
      Song.destroy(params[:id])
      redirect_to songs_path
    else
      flash[:notice] = "You don't have permission to delete this song!"
      redirect_to @song
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist, :description, :term)
  end

end
