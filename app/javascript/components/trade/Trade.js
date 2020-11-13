import React from 'react';

const Trade = (props) => {
  return (
    <div className="stock-container">
      <p className="stock-symbol">{props.attributes.stock_symbol}</p>
      <p className="stock-symbol">{props.attributes.trade_date}</p>
      <p className="stock-symbol">{props.attributes.market}</p>
      <p className="stock-symbol">{props.attributes.volume}</p>
      <p className="stock-symbol">{props.attributes.trade_change}</p>
      <p className="stock-symbol">{props.attributes.performance}</p>
      <button id={props.tradeID} onClick={props.deleteTrade}>Delete</button>
    </div>
  );
}

export default Trade;