FactoryBot.define do
  factory :comment do
    content { "Sample comment" }
    user
    report
  end
end
