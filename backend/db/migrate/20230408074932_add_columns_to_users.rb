class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :profile, :string, limit: 255, after: :name
  end

  remove_column :users, :nickname, :string
end
