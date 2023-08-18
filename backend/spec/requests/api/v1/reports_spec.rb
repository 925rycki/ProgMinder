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
    let(:report) { create(:report, user:) }
    let(:json_response) { response.parsed_body }
    let(:retuened_report) { json_response['report']['report'] }

    context 'レポートが存在する場合' do
      before do
        get api_v1_report_path(report.id), as: :json
      end

      it 'okレスポンスが返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      it 'IDが正しく返されること' do
        expect(retuened_report['id']).to eq(report.id)
      end

      it '作成日が正しく返されること' do
        expect(retuened_report['created_date']).to eq(report.created_date)
      end

      it '本日の目標が正しく返されること' do
        expect(retuened_report['todays_goal']).to eq(report.todays_goal)
      end

      it '学習時間が正しく返されること' do
        expect(retuened_report['study_time']).to eq(report.study_time)
      end

      it '目標振り返りが正しく返されること' do
        expect(retuened_report['goal_review']).to eq(report.goal_review)
      end

      it '詰まっていることが正しく返されること' do
        expect(retuened_report['challenges']).to eq(report.challenges)
      end

      it '学んだことが正しく返されること' do
        expect(retuened_report['learnings']).to eq(report.learnings)
      end

      it '感想が正しく返されること' do
        expect(retuened_report['thoughts']).to eq(report.thoughts)
      end

      it '明日の目標が正しく返されること' do
        expect(retuened_report['tomorrows_goal']).to eq(report.tomorrows_goal)
      end
    end

    context 'レポートが存在しない場合' do
      before do
        get api_v1_report_path(9_999_999), as: :json
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

    context "ユーザーがログインしていて、有効なパラメータの場合" do
      let(:auth_headers) { user.create_new_auth_token }

      it "新しいレポートが作成できること" do
        expect do
          post api_v1_reports_path, params: valid_params, headers: auth_headers, as: :json
        end.to change(Report, :count).by(1)
      end
    end
  end

  describe 'PUT /api/v1/reports/:id' do
    let(:auth_headers) { user.create_new_auth_token }
    let(:report) { create(:report, user:) }
    let(:valid_params) { { todays_goal: 'Updated sample todays goal' } }

    context 'レポートが存在して、ユーザーが所有者の場合' do
      it 'レポートを更新できること' do
        put api_v1_report_path(report.id), params: { report: valid_params }, headers: auth_headers, as: :json
        expect(report.reload.todays_goal).to eq(valid_params[:todays_goal])
      end

      it 'okレスポンスが返ってくること' do
        put api_v1_report_path(report.id), params: { report: valid_params }, headers: auth_headers, as: :json
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'DELETE /api/v1/reports/:id' do
    let(:user) { create(:user) }
    let(:other_user) { create(:other_user) }
    let!(:report) { create(:report, user:) }
    let(:auth_headers) { user.create_new_auth_token }

    context 'レポートが存在して、ユーザーが所有者の場合' do
      it 'レポートが削除できること' do
        expect do
          delete api_v1_report_path(report.id), headers: auth_headers, as: :json
        end.to change(Report, :count).by(-1)
      end

      it 'no contentレスポンスが返ってくること' do
        delete api_v1_report_path(report.id), headers: auth_headers, as: :json
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
