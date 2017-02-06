class VotesController < ApplicationController

  before_action :load_song_and_vote
  def up_vote
    update_vote!(1)
    redirect_to song_path(params[:bar_id])

  end

  def down_vote
    update_vote!(-1)
    redirect_to song_path(params[:bar_id])
  end

  private

  def load_review_and_vote
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
      @vote = @user.votes.create(value: new_value, review: @review)
      @vote.save
    end
    @song.update_score!
  end

end
