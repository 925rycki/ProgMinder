class CreateReports < ActiveRecord::Migration[7.0]
  def change
    create_table :reports do |t|
      t.string :created_date
      t.string :todays_goal
      t.integer :study_time
      t.string :goal_review
      t.string :challenges
      t.string :learnings
      t.string :thoughts
      t.string :tomorrows_goal
      t.integer :user_id

      t.timestamps
    end
  end
end
