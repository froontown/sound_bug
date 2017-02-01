class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :song

  def update_score!
    update(score: votes.sum(:value))
  end
end
