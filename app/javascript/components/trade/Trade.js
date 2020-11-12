import React from 'react';

const Trade = (props) => {
  return (
    <div className="stock-container">
      <p className="stock-symbol">Symbol: {props.attributes.stock_symbol}</p>
      <p className="stock-symbol">Date: {props.attributes.trade_date}</p>
      <p className="stock-symbol">Market: {props.attributes.market}</p>
      <p className="stock-symbol">Volume: {props.attributes.volume}</p>
      <p className="stock-symbol">Change: {props.attributes.trade_change}</p>
      <p className="stock-symbol">Profit/Loss: {props.attributes.performance}</p>
      <button id={props.tradeID} onClick={props.deleteTrade}>Delete</button>
    </div>
  );
}

export default Trade;