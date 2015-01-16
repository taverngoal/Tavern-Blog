class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.string :message
      t.string :trace
      t.string :ip

      t.timestamps
    end
  end
end
