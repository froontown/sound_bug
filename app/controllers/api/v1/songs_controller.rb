class Api::V1::SongController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def show
    @songs = Song.all
    @users = []
    @user = current_user
    @songs.each do |song|
      @users << @user
    end
    render json: {reviews: @songs, users: @users, currentUser: @user}
  end
end
