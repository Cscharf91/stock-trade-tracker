import React from 'react';

const Form = (props) => {
  return (
    <div className="form-wrapper">
      <h3 className="tradeform-title">Enter Trades</h3>
      <form onSubmit={props.handleSubmit}>
        <div className="field">
          <label htmlFor="stock_symbol">Stock Symbol:</label>
          <input onChange={props.handleChange} className="symbol-caps" type="text" value={props.trade.stock_symbol} name="stock_symbol" />
        </div>
        <div className="field">
          <label htmlFor="trade_date">Trade Date:</label>
          <input onChange={props.handleChange} type="date" value={props.trade.trade_date} name="trade_date" />
        </div>
        <div className="field">
          <label htmlFor="market">Trading With or Against the Market:</label>
          <p className="tip">"Trading with" means a long with an up market, or vice versa. "Trading against" is a long with a down market. </p>
          <select onChange={props.handleChange} value={props.trade.market} name="market">
            <option value=""></option>
            <option value="Trading With">Trading With</option>
            <option value="Trading Against">Trading Against</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="volume">5/10 Volume %:</label>
          <select onChange={props.handleChange} value={props.trade.volume} name="volume">
            <option value=""></option>
            <option value="5x Volume">5x Volume</option>
            <option value="10x Volume">10x Volume</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="trade_change">Stock % Change:</label>
          <select onChange={props.handleChange} value={props.trade.trade_change} name="trade_change">
            <option value=""></option>
            <option value="Under 10%">Under 10%</option>
            <option value="10-20%">10-20%</option>
            <option value="20%+">20%+</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="performance">Profit/Loss:</label>
          <select onChange={props.handleChange} value={props.trade.performance} name="performance">
            <option value=""></option>
            <option value="Half Win">Half Win</option>
            <option value="Full Win">Full Win</option>
            <option value="Half Loss">Half Loss</option>
            <option value="Full Loss">Full Loss</option>
          </select>
        </div>
        <div className="field btm-center">
          <button type="submit">Add Trade</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

// t.string :stock_symbol
// t.date :trade_date
// t.string :market
// t.string :volume
// t.string :performance