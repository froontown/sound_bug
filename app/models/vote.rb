class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :song

  validates :value, presence: true
end
