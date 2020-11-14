import React from 'react';

const Filters = (props) => {
  return (
    <div className="filter-wrapper">
      {/* <button className="x-out" onClick={props.xOut}>X</button> */}
      <h3 className="filters-title">Search for Trades</h3>
      <form onSubmit={props.submitSearch}>
      <div className="field">
          <label htmlFor="market">Market:</label>
          <select onChange={props.handleSearchChange} value={props.searchList.market} name="market">
            <option value=""></option>
            <option value="Trading With">Trading With</option>
            <option value="Trading Against">Trading Against</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="volume">5/10 Volume %:</label>
          <select onChange={props.handleSearchChange} value={props.searchList.volume} name="volume">
            <option value=""></option>
            <option value="5x Volume">5x Volume</option>
            <option value="10x Volume">10x Volume</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="trade_change">Stock % Change:</label>
          <select onChange={props.handleSearchChange} value={props.searchList.trade_change} name="trade_change">
            <option value=""></option>
            <option value="Under 10%">Under 10%</option>
            <option value="10-20%">10-20%</option>
            <option value="20%+">20%+</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="performance">Profit/Loss:</label>
          <select onChange={props.handleSearchChange} value={props.searchList.performance} name="performance">
            <option value=""></option>
            <option value="Half Win">Half Win</option>
            <option value="Full Win">Full Win</option>
            <option value="Half Loss">Half Loss</option>
            <option value="Full Loss">Full Loss</option>
          </select>
        </div>
        <div className="field btm-right">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default Filters;