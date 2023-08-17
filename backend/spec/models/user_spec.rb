require 'rails_helper'

RSpec.describe User do
  let(:user) { create(:user) }
  let(:another_user) { create(:user) }

  describe 'バリデーション' do
    it 'name, email, passwordがあれば有効であること' do
      expect(user).to be_valid
    end

    it 'nameがなければ無効であること' do
      user.name = nil
      expect(user).not_to be_valid
    end

    it '重複したnameなら無効であること' do
      duplicate_user = user.dup
      duplicate_user.name = user.name
      expect(duplicate_user).not_to be_valid
    end

    it 'ユニークなnameなら有効であること' do
      expect(another_user).to be_valid
    end

    it 'nameが255文字以内なら有効であること' do
      user = build(:user, name: 'a' * 255)
      expect(user).to be_valid
    end

    it 'nameが256文字以上なら無効であること' do
      user = build(:user, name: 'a' * 256)
      expect(user).not_to be_valid
    end

    it 'nicknameが255文字以内なら有効であること' do
      user = build(:user, nickname: 'a' * 255)
      expect(user).to be_valid
    end

    it 'nicknameが256文字以上なら無効であること' do
      user = build(:user, nickname: 'a' * 256)
      expect(user).not_to be_valid
    end

    it 'bioが255文字以内なら有効であること' do
      user = build(:user, bio: 'a' * 255)
      expect(user).to be_valid
    end

    it 'bioが256文字以上なら無効であること' do
      user = build(:user, bio: 'a' * 256)
      expect(user).not_to be_valid
    end
  end
end
