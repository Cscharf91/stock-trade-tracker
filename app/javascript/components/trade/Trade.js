import React, { useEffect, useState } from 'react';

const Trade = (props) => {
  const [stockPerformance, setStockPerformance] = useState('');
  useEffect(() => {
    const performance = props.attributes.performance;
    if (performance === "Half Win") {
      setStockPerformance("stock-win");
    } else if (performance === "Full Win") {
      setStockPerformance("stock-win");
    } else if (performance === "Half Loss") {
      setStockPerformance("stock-lose");
    } else if (performance === "Full Loss") {
      setStockPerformance("stock-lose");
    }
  }, [])
  return (
    <div className="stock-container">
      <p className="stock-symbol"><strong>{props.attributes.stock_symbol}</strong></p>
      <p className="stock-symbol hide-mobile">{props.attributes.trade_date}</p>
      <p className="stock-symbol hide-mobile">{props.attributes.market}</p>
      <p className="stock-symbol hide-mobile">{props.attributes.volume}</p>
      <p className="stock-symbol">{props.attributes.trade_change}</p>
      <p className={stockPerformance}>{props.attributes.performance}</p>
      <button id={props.tradeID} onClick={props.deleteTrade}>Delete</button>
    </div>
  );
}

export default Trade;