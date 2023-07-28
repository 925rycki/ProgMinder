class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.bigint :user_id, null: false
      t.bigint :report_id, null: false
      t.string :content, null: false

      t.timestamps
    end
  end
end
