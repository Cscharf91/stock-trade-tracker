class AddUserToTrades < ActiveRecord::Migration[6.0]
  def change
    add_column :trades, :user_id, :integer
  end
end
