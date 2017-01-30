class SongsController < ApplicationController

  def index
    if params[:term]
      @songs = Song.search(params[:term])
    else
      @song = Song.all
    end
    @song = Song.new
  end

  def show
    @user = current_user
    @song = Song.find(params[:id])
  end

end
