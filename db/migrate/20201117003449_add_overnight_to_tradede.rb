class AddOvernightToTradede < ActiveRecord::Migration[6.0]
  def change
    add_column :trades, :day_or_overnight, :string
  end
end
