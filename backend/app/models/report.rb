class Report < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :created_date, length: { maximum: 255 }
  validates :todays_goal, length: { maximum: 255 }
  validates :study_time, presence: true
  validates :goal_review, presence: true, length: { maximum: 255 }
  validates :challenges, length: { maximum: 255 }
  validates :learnings, length: { maximum: 255 }
  validates :thoughts, length: { maximum: 255 }
  validates :tomorrows_goal, length: { maximum: 255 }
  validates :user_id, presence: true
end
