class Api::V1::SongsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @songs = Song.all.order("score DESC")
    @users = []
    @user = current_user
    @songs.each do |song|
      @users << @user
    end
    render json: {songs: @songs, users: @users, currentUser: @user}
  end

end
