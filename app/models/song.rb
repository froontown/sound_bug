class Song < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :votes

  validates :name, presence: true
  validates :artist, presence: true
  validates :description, presence: true

  # attachment :audio, extension: ["mp3", "mp4", "m4a", "aif", "wav"]

  def self.search(term)
    if term
      where('LOWER (name) LIKE ?', "%#{term.downcase}%")
    else
      all
    end
  end

  def update_score!
    update(score: votes.sum(:value))
  end
end
