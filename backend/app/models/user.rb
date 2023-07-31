# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true, uniqueness: true

  has_many :reports, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :follower, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :followed, class_name: 'Follow', foreign_key: 'followed_id', dependent: :destroy

  mount_uploader :image, ImageUploader

  def following?(user)
    follower.exists?(followed_id: user.id)
  end
end
