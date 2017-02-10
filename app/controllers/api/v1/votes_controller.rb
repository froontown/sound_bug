class Api::V1::VotesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_action :load_song_and_vote

  def up_vote
    update_vote!(1)
  end

  def down_vote
    update_vote!(-1)
  end

  private

  def load_song_and_vote
    @song = Song.find(params[:song_id])
    @user = current_user
    @vote = @song.votes.where(user: @user).first
  end

  def update_vote!(new_value)
    if @vote
      if @vote.value == new_value
        @vote.update(value: 0)
      else
        @vote.update(value: new_value)
      end
    else
      @vote = @user.votes.create(value: new_value, song: @song)
      @vote.save
    end
    @song.update_score!
  end
end
