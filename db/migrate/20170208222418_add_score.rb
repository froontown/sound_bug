class AddScore < ActiveRecord::Migration[5.0]
  def change
    add_column :songs, :score, :integer, default: 0
  end
end
