import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Trade from '../trade/Trade';
import Form from './Form';
import './trades.css';

const Trades = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({});

  useEffect(() => {
    // getTrades();
    Axios.get('/api/v1/trades.json')
    .then((resp) => {
        if (resp.data.data.length > 0) {
        setTrades(resp.data.data);
        console.log(resp.data.data)
      }
    })
    .catch((err) => console.log(err));
  }, [trades.length])

  const handleChange = (e) => {
    e.preventDefault();
    setNewTrade({...newTrade, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newTrade.trade_change);

    const csrfToken = document.querySelector('[name=csrf-token]').textContent;
    Axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    Axios.post('/api/v1/trades', newTrade)
      .then(resp => {
        setTrades([resp.data.data, ...trades])
        setNewTrade({stock_symbol: '', trade_date: '', market: '', volume: '', trade_change: '', performance: ''})
        console.log(resp);
      })
      .catch(err => console.log(err));
  }

  const deleteTrade = (e) => {
    const id = e.target.id;
    const tradesArr = [...trades];
    Axios.delete(`/api/v1/trades/${id}`)
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
    tradesArr.forEach((trade, index) => {
      if (trade.id === id) {
        tradesArr.splice(index, 1);
        setTrades(tradesArr);
      }
    })
  }

  const tradesGrid = trades.map((item) => {
    if (trades !== null) {
      return (
        <Trade
          key={item.attributes.stock_symbol}
          tradeID={item.id}
          attributes={item.attributes}
          deleteTrade={deleteTrade}
          />
      )
    }
  })

  return (
    <div className="home">
      <h1 className="header">Stock Demo</h1>
      <p className="subheader">How are your stock trades doing?</p>
      <Form
        trade={newTrade}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="trades-grid">
        {tradesGrid}
      </div>
    </div>
  );
}

export default Trades;