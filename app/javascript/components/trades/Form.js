import React from 'react';

const Form = (props) => {
  const toggleToolTipOn = (e) => {
    const tip = document.querySelector('.tip');
    tip.classList.toggle('off');
    tip.classList.toggle('fade-in');
    setTimeout(() => {
      tip.classList.toggle('fade-in');
    }, 250)
    let x = e.clientX,
        y = e.clientY;
    tip.style.top = (y + 20) + 'px';
    tip.style.left = (x + 20) + 'px';
  }
  const toggleToolTipOff = (e) => {
    const tip = document.querySelector('.tip');
    tip.classList.toggle('fade-out');
    setTimeout(() => {
      tip.classList.toggle('fade-out');
      tip.classList.toggle('off');
    }, 250)
  }
  const performance = parseFloat(props.trade.performance).toFixed(2);
  return (
    <div className="form-wrapper">
      <h3 className="tradeform-title">Enter Trades</h3>
      <form onSubmit={props.handleSubmit}>
        <div className="field">
          <label htmlFor="stock_symbol">Stock Symbol:</label>
          <input onChange={props.handleChange} className="symbol-caps" type="text" value={props.trade.stock_symbol} name="stock_symbol" required />
        </div>
        <div className="field">
          <label htmlFor="trade_date">Trade Date:</label>
          <input onChange={props.handleChange} type="date" value={props.trade.trade_date} name="trade_date" />
        </div>
        <div className="field">
          <label htmlFor="market">Market:</label>
          <i class="fa fa-question-circle" onMouseEnter={toggleToolTipOn} onMouseLeave={toggleToolTipOff} name="market"></i>
          <p className="tip off">"Trading with" means a long with an up market, or vice versa. "Trading against" is a long with a down market. </p>
          <select onChange={props.handleChange} value={props.trade.market} name="market">
            <option value="">Select Option</option>
            <option value="Trading With">Trading With</option>
            <option value="Trading Against">Trading Against</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="volume">5/10 Volume %:</label>
          <select onChange={props.handleChange} value={props.trade.volume} name="volume">
            <option value="">Select Option</option>
            <option value="5x Volume">5x Volume</option>
            <option value="10x Volume">10x Volume</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="trade_change">Stock % Change:</label>
          <select onChange={props.handleChange} value={props.trade.trade_change} name="trade_change">
            <option value="">Select Option</option>
            <option value="Under 10%">Under 10%</option>
            <option value="10-20%">10-20%</option>
            <option value="20%+">20%+</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="day_or_overnight">Day Trade or Overnight:</label>
          <select onChange={props.handleChange} value={props.trade.day_or_overnight} name="day_or_overnight">
            <option value="">Select Option</option>
            <option value="Day Trade">Day Trade</option>
            <option value="Overnight">Overnight</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="performance">Profit/Loss: {performance}</label>
          <input type="range" name="performance" value={props.trade.performance}
            onChange={props.handleChange} min="-1" max="1" step="0.05" />
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