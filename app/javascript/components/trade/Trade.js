import React, { useEffect, useState } from 'react';

const Trade = (props) => {
  const [stockPerformance, setStockPerformance] = useState('');
  useEffect(() => {
    const performance = props.attributes.performance;
    if (performance > 0) {
      setStockPerformance("stock-win");
    } else if (performance < 0) {
      setStockPerformance("stock-lose");
    } else {
      setStockPerformance("scratch")
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