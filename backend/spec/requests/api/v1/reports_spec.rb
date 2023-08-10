require 'rails_helper'

RSpec.describe "Api::V1::Reports" do
  describe "GET /api/v1/reports" do
    let(:user) { create(:user) }

    before do
      create_list(:report, 3, user:)

      get api_v1_reports_path, as: :json
    end

    it 'returns a successful response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns all reports' do
      reports_data = response.parsed_body
      expect(reports_data.size).to eq(3)
    end
  end
end
