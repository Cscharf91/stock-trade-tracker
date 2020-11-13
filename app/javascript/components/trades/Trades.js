import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import TradeHeader from '../trade/TradeHeader';
import Trade from '../trade/Trade';
import Form from './Form';
import './trades.css';
import Filters from './Filters';

const Trades = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [searchList, setSearchList] = useState({});

  useEffect(() => {
    getTrades();
  }, [])

  const getTrades = async () => {
    Axios.get('/api/v1/trades.json')
      .then((resp) => {
          if (resp.data.data.length > 0) {
          setTrades(resp.data.data);
          setLoaded(true);
        }
      })
      .catch((err) => console.log(err));
  }

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

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchList({...searchList, [e.target.name]: e.target.value});
  }

  const submitSearch = async (e) => {
    e.preventDefault();
    const keys = getSearchKeys();
    await getTrades();
    const newList = [];
    const tradesList = trades;
    for (let i = 0; i < tradesList.length; i++) {
      if ((keys[0] !== "" && tradesList[i].attributes.market === searchList.market || keys[0] === "") &&
      (keys[1] !== "" && tradesList[i].attributes.volume === searchList.volume || keys[1] === "") &&
      (keys[2] !== "" && tradesList[i].attributes.trade_change === searchList.trade_change || keys[2] === "") &&
      (keys[3] !== "" && tradesList[i].attributes.performance === searchList.performance || keys[3] === "")
      ) {
        newList.push(tradesList[i]);
      }
    }
    console.log(newList);
  }
  
  const getSearchKeys = () => {
    const keysList = [];
    if (searchList.market) {
      keysList.push(searchList.market);
    } else {
      keysList.push("");
    }
    if (searchList.volume) {
      keysList.push(searchList.volume);
    } else {
      keysList.push("");
    }
    if (searchList.trade_change) {
      keysList.push(searchList.trade_change);
    } else {
      keysList.push("");
    }
    if (searchList.performance) {
      keysList.push(searchList.performance);
    } else {
      keysList.push("");
    }
    return keysList;
  }

  let tradesHead;
  if (loaded) {
    tradesHead = <TradeHeader/>
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
      <Filters
        searchList={searchList}
        submitSearch={submitSearch}
        handleSearchChange={handleSearchChange}
      />
      <div className="trades-grid">
        {tradesHead}
        {tradesGrid}
      </div>
    </div>
  );
}

export default Trades;