import React from 'react';

const TradeHeader = (props) => {
  return (
    <div className="stock-container">
      <p className="stock-symbol"><strong>Symbol</strong></p>
      <p className="stock-symbol hide-mobile"><strong>Date</strong></p>
      <p className="stock-symbol hide-mobile"><strong>Market</strong></p>
      <p className="stock-symbol hide-mobile"><strong>Volume</strong></p>
      <p className="stock-symbol"><strong>Change</strong></p>
      <p className="stock-symbol"><strong>Profit/Loss</strong></p>
    </div>
  );
}

export default TradeHeader;