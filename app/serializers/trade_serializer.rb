class TradeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :stock_symbol, :trade_date, :market, :volume, :trade_change, :performance
end
