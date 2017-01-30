class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.string :artist, null: false
      t.text :description, null: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
