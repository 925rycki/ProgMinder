require 'rails_helper'

RSpec.describe 'Api::V1::Reports' do
  let(:user) { create(:user) }
  let(:auth_headers) { user.create_new_auth_token }
  let(:other_user) { create(:user) }
  let(:other_auth_headers) { other_user.create_new_auth_token }
  let(:report) { create(:report, user:) }

  describe 'GET /api/v1/reports' do
    before do
      create_list(:report, 3, user:)
      get api_v1_reports_path, as: :json
    end

    it 'okレスポンスが返ってくること' do
      expect(response).to have_http_status(:ok)
    end

    it '全てのレポートが返ってくること' do
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe 'GET /api/v1/reports/:id' do
    context 'レポートが存在する場合' do
      before { get api_v1_report_path(report.id), as: :json }

      it 'okレスポンスが返ってくること' do
        expect(response).to have_http_status(:ok)
      end

      %w[id created_date todays_goal study_time goal_review challenges learnings thoughts tomorrows_goal].each do |attribute|
        it "正しい#{attribute}が返ってくること" do
          expect(response.parsed_body['report']['report'][attribute]).to eq(report.send(attribute))
        end
      end
    end

    context 'レポートが存在しない場合' do
      before { get api_v1_report_path(9_999_999), as: :json }

      it 'not foundレスポンスが返ってくること' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST /api/v1/reports' do
    valid_params = {
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

    context 'ユーザーがサインインしていて、有効なパラメータの場合' do
      it '新しいレポートを作成できること' do
        expect do
          post api_v1_reports_path, params: valid_params, headers: auth_headers, as: :json
        end.to change(Report, :count).by(1)
      end
    end

    context 'ユーザーがサインインしていない場合' do
      it 'unauthorizedレスポンスが返ってくること' do
        post api_v1_reports_path, params: valid_params, as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'ユーザーがサインインしていて、無効なパラメータの場合' do
      invalid_params = {
        report: {
          created_date: nil,
          todays_goal: nil,
          study_time: nil,
          goal_review: nil,
          challenges: nil,
          learnings: nil,
          thoughts: nil,
          tomorrows_goal: nil
        }
      }

      it '新しいレポートを作成できないこと' do
        expect do
          post api_v1_reports_path, params: invalid_params, headers: auth_headers, as: :json
        end.not_to change(Report, :count)
      end

      it 'unprocessable entityレスポンスが返ってくること' do
        post api_v1_reports_path, params: invalid_params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT /api/v1/reports/:id' do
    def perform_request(report_id, headers = {}, params = {})
      put api_v1_report_path(report_id), params:, headers:, as: :json
    end

    context 'レポートが存在していて、ユーザーが所有者である場合' do
      before { perform_request(report.id, auth_headers, report: { todays_goal: 'Updated sample todays goal' }) }

      it 'レポートを更新できること' do
        expect(report.reload.todays_goal).to eq('Updated sample todays goal')
      end

      it 'okレスポンスが返ってくること' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'ユーザーがサインインしていない場合' do
      before { perform_request(report.id, {}, report: { todays_goal: 'Updated sample todays goal' }) }

      it 'unauthorizedレスポンスが返ってくること' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'レポートが存在していて、ユーザーが所有者でない場合' do
      before { perform_request(report.id, other_auth_headers, report: { todays_goal: 'Updated sample todays goal' }) }

      it 'レポートを更新できないこと' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/reports/:id' do
    let!(:report) { create(:report, user:) }

    context 'レポートが存在していて、ユーザーが所有者である場合' do
      it 'レポートを削除できること' do
        expect do
          delete api_v1_report_path(report.id), headers: auth_headers, as: :json
        end.to change(Report, :count).by(-1)
      end

      it 'okレスポンスが返ってくること' do
        delete api_v1_report_path(report.id), headers: auth_headers, as: :json
        expect(response).to have_http_status(:ok)
      end
    end

    context 'レポートが存在していて、ユーザーが所有者でない場合' do
      it 'unauthorizedレスポンスが返ってくること' do
        delete api_v1_report_path(report.id), headers: other_auth_headers, as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
