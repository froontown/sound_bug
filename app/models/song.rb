class Song < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :name, presence: true
  validates :artist, presence: true
  validates :description, presence: true

  def self.search(term)
    if term
      where('LOWER (name) LIKE ?', "%#{term.downcase}%")
    else
      all
    end
  end
end
