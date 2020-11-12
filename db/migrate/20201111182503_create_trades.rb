class CreateTrades < ActiveRecord::Migration[6.0]
  def change
    create_table :trades do |t|
      t.string :stock_symbol
      t.date :trade_date
      t.string :market
      t.string :volume
      t.string :performance

      t.timestamps
    end
  end
end
