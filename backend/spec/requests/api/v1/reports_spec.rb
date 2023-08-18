require 'rails_helper'

RSpec.describe 'Api::V1::Reports' do
  let(:user) { create(:user) }
  describe 'GET /api/v1/reports' do
    let(:user) { create(:user) }

    before do
      create_list(:report, 3, user:)
      get api_v1_reports_path, as: :json
    end

    it 'okレスポンスが返ってくること' do
      expect(response).to have_http_status(:ok)
    end

    it 'すべてのレポートが返ってくること' do
      reports_data = response.parsed_body
      expect(reports_data.size).to eq(3)
    end
  end

  describe 'GET /api/v1/reports/:id' do
    let(:user) { create(:user) }
    let(:report) { create(:report, user: user) }

    context 'レポートが存在する場合' do
      before do
        get api_v1_report_path(report.id), as: :json
      end

      it 'okレスポンスが返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'レポートの内容が正しく返されること' do
        json_response = JSON.parse(response.body)
        expect(json_response['report']['report']['id']).to eq(report.id)
        expect(json_response['report']['report']['todays_goal']).to eq(report.todays_goal)
        expect(json_response['report']['report']['study_time']).to eq(report.study_time)
        expect(json_response['report']['report']['goal_review']).to eq(report.goal_review)
        expect(json_response['report']['report']['challenges']).to eq(report.challenges)
        expect(json_response['report']['report']['learnings']).to eq(report.learnings)
        expect(json_response['report']['report']['thoughts']).to eq(report.thoughts)
        expect(json_response['report']['report']['tomorrows_goal']).to eq(report.tomorrows_goal)
      end
    end

    context 'レポートが存在しない場合' do
      before do
        get api_v1_report_path(9999999), as: :json
      end
  
      it 'not foundレスポンスが返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST /api/v1/reports' do
    let(:valid_params) do
      {
        report: {
          created_date: '2023-01-01',
          todays_goal: 'Sample todays goal',
          study_time: 2,
          goal_review: 'Sample goal review',
          challenges: 'Sample challenges',
          learnings: 'Sample learnings',
          thoughts: 'Sample thoughts',
          tomorrows_goal: 'Sample tomorrow goal'
        }
      }
    end

    context "ユーザーがログインしている場合" do
      let(:auth_headers) { user.create_new_auth_token }
  
      context "有効なパラメータの場合" do
        it "新しいレポートが作成できること" do
          expect {
            post api_v1_reports_path, params: valid_params, headers: auth_headers, as: :json
          }.to change(Report, :count).by(1)
        end
      end
    end
  end

  describe 'PUT /api/v1/reports/:id' do
    let(:auth_headers) { user.create_new_auth_token }
    let(:report) { create(:report, user: user) }
    let(:valid_params) { { todays_goal: 'Updated sample todays goal' } }

    context 'レポートが存在する場合' do
      context 'ユーザーが所有者の場合' do
        it 'レポートを更新して、okレスポンスを返すこと' do

          put api_v1_report_path(report.id), params: { report: valid_params }, headers: auth_headers, as: :json
          expect(response).to have_http_status(:ok)
          expect(report.reload.todays_goal).to eq(valid_params[:todays_goal])
        end
      end
    end
  end

  
  describe 'DELETE /api/v1/reports/:id' do
    let(:user) { create(:user) }
    let(:other_user) { create(:other_user) }
    let!(:report) { create(:report, user: user) }
    let(:auth_headers) { user.create_new_auth_token }
    context 'when the report exists' do
      context 'and the user is the owner' do
        it 'deletes the report and returns a 204 status code' do
          expect {
            delete api_v1_report_path(report.id), headers: auth_headers, as: :json
          }.to change(Report, :count).by(-1)
          expect(response).to have_http_status(:no_content)
        end
      end
    end
  end
end
