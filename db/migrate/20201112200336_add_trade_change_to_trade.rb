class AddTradeChangeToTrade < ActiveRecord::Migration[6.0]
  def change
    add_column :trades, :trade_change, :string
  end
end
