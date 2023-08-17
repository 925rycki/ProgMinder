require 'rails_helper'

RSpec.describe Report do
  describe "アソシエーション" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:likes).dependent(:destroy) }
    it { is_expected.to have_many(:comments).dependent(:destroy) }
  end

  describe "バリデーション" do
    it { is_expected.to validate_length_of(:created_date).is_at_most(255) }
    it { is_expected.to validate_length_of(:todays_goal).is_at_most(255) }
    it { is_expected.to validate_length_of(:goal_review).is_at_most(255) }
    it { is_expected.to validate_length_of(:challenges).is_at_most(255) }
    it { is_expected.to validate_length_of(:learnings).is_at_most(255) }
    it { is_expected.to validate_length_of(:thoughts).is_at_most(255) }
    it { is_expected.to validate_length_of(:tomorrows_goal).is_at_most(255) }
    it { is_expected.to validate_presence_of(:study_time) }
  end
end
