require 'rails_helper'

RSpec.describe "Api::V1::Reports", type: :request do
  describe "GET /api/v1/reports" do
    before do
      @user = create(:user)
      3.times { create(:report, user: @user) }
      get api_v1_reports_path, as: :json
    end

    it 'returns a successful response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns all reports' do
      reports = JSON.parse(response.body)
      expect(reports.size).to eq(2)
    end
  end
end
