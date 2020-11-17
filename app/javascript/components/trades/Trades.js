import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import TradeHeader from '../trade/TradeHeader';
import Trade from '../trade/Trade';
import Form from './Form';
import Filters from './Filters';
import useDidUpdateEffect from './useDidUpdateEffect';
import Stats from './Stats';
import Header from '../Header';


const Trades = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({
    performance: 0
  });
  const [loaded, setLoaded] = useState(false);
  const [searchList, setSearchList] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [dataList, setDataList] = useState({
    totalTrades: 0,
    tradesList: []
  });
  const [avg, setAvg] = useState("");

  useEffect(() => {
    getTrades();
  }, [])

  useDidUpdateEffect(() => {
      const grid = document.querySelector('.trades-grid');
      const homeGrid = document.querySelector('.home');
      grid.remove();
      ReactDOM.render(
        <div className="trades-grid">
          <TradeHeader/>
          {searchGrid}
        </div>,
        homeGrid.appendChild(document.createElement('div')),
      )
  }, [searchResults.length])

  useEffect(() => {
    if (dataList.totalTrades === 0) {
      setAvg("Not Available");
    } else {
      getWinsAndLosses();
    }
  }, [dataList]);

  const getWinsAndLosses = () => {
    const tradesList = dataList.tradesList;
    const newWinners = [];
    const newLosers = [];
    const newScratches = [];
    for (let i = 0; i < tradesList.length; i++) {
      const performance = tradesList[i].attributes.performance;
      if (performance > 0) {
        newWinners.push(performance)
      } else if (performance < 0) {
        newLosers.push(performance)
      } else {
        newScratches.push(performance)
      }
    }
    findAvg(newWinners, newLosers);
  }

  const findAvg = (wins, losses) => {
    const totalTrades = dataList.totalTrades;
    let winTotal = 0;
    let lossTotal = 0;
    for (let i = 0; i < wins.length; i++) {
      winTotal += parseFloat(wins[i].trim());
    }
    for (let i = 0; i < losses.length; i++) {
      lossTotal += parseFloat(losses[i]);
    }
    const avgTotal = winTotal + lossTotal;
    setAvg((avgTotal / totalTrades).toFixed(2));
  }

  const getTrades = () => {
    Axios.get('/api/v1/trades.json')
      .then((resp) => {
          if (resp.data.data.length > 0) {
            setTrades(resp.data.data);
            setLoaded(true);
            getProfitRange(resp.data.data);
          } 
          if (trades.length < 1) {
            getData(resp.data.data);
          }
      })
      .catch((err) => console.log(err));
  }

  const getProfitRange = (tradesList) => {
    for(let i = 0; i < tradesList.length; i++) {
      if (tradesList[i].attributes.performance == 0) {
        tradesList[i].attributes.profitRange = "0";
      } else if (tradesList[i].attributes.performance > 0 && tradesList[i].attributes.performance <= 0.25) {
        tradesList[i].attributes.profitRange = "1";
      } else if (tradesList[i].attributes.performance > 0.25 && tradesList[i].attributes.performance <= 0.5) {
        tradesList[i].attributes.profitRange = "2";
      } else if (tradesList[i].attributes.performance > 0.5 && tradesList[i].attributes.performance <= 0.75) {
        tradesList[i].attributes.profitRange = "3";
      } else if (tradesList[i].attributes.performance > 0.75 && tradesList[i].attributes.performance <= 1) {
        tradesList[i].attributes.profitRange = "4";
      } else if (tradesList[i].attributes.performance < 0 && tradesList[i].attributes.performance >= -0.25) {
        tradesList[i].attributes.profitRange = "5";
      } else if (tradesList[i].attributes.performance < -0.25 && tradesList[i].attributes.performance >= -0.5) {
        tradesList[i].attributes.profitRange = "6";
      } else if (tradesList[i].attributes.performance < -0.5 && tradesList[i].attributes.performance >= -0.75) {
        tradesList[i].attributes.profitRange = "7";
      } else if (tradesList[i].attributes.performance < -0.75 && tradesList[i].attributes.performance >= -1) {
        tradesList[i].attributes.profitRange = "8";
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "stock_symbol") {
      setNewTrade({...newTrade, stock_symbol: e.target.value.toUpperCase()});
    } else {
      setNewTrade({...newTrade, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newTrade);

    const csrfToken = document.querySelector('[name=csrf-token]').textContent;
    Axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    Axios.post('/api/v1/trades', newTrade)
      .then(resp => {
        setTrades([resp.data.data, ...trades]);
        getData([resp.data.data, ...trades]);
        getProfitRange([resp.data.data, ...trades]);
        setNewTrade({stock_symbol: '', trade_date: '', market: '', volume: '', trade_change: '', performance: 0});
      })
      .catch(err => console.log(err));
  }

  const deleteTrade = (e) => {
    const id = e.target.id;
    const tradesArr = [...trades];
    Axios.delete(`/api/v1/trades/${id}`)
      .then(resp => tradesArr.forEach((trade, index) => {
        if (trade.id === id) {
          tradesArr.splice(index, 1);
          setTrades(tradesArr);
          getData(tradesArr);
        }
      }))
      .catch(err => console.log(err));
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
      (keys[3] !== "" && tradesList[i].attributes.profitRange === searchList.performance || keys[3] === "") &&
      (keys[4] !== "" && tradesList[i].attributes.day_or_overnight === searchList.day_or_overnight || keys[4] === "")
      ) {
        newList.push(tradesList[i]);
      }
    }
    setSearchResults(newList);
    getData(newList);
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
    if (searchList.day_or_overnight) {
      keysList.push(searchList.day_or_overnight);
    } else {
      keysList.push("");
    }
    return keysList;
  }

  const getData = (tradesList) => {
    let scratches = 0;
    let quarterUp = 0;
    let quarterDown = 0;
    let halfUp = 0;
    let halfDown = 0;
    let threeQuartUp = 0;
    let threeQuartDown = 0;
    let fullUp = 0;
    let fullDown = 0;
    for(let i = 0; i < tradesList.length; i++) {
      if (tradesList[i].attributes.performance == 0) {
        scratches++;
      } else if (tradesList[i].attributes.performance > 0 && tradesList[i].attributes.performance <= 0.25) {
        quarterUp++;
      } else if (tradesList[i].attributes.performance > 0.25 && tradesList[i].attributes.performance <= 0.5) {
        halfUp++;
      } else if (tradesList[i].attributes.performance > 0.5 && tradesList[i].attributes.performance <= 0.75) {
        threeQuartUp++;
      } else if (tradesList[i].attributes.performance > 0.75 && tradesList[i].attributes.performance <= 1) {
        fullUp++;
      } else if (tradesList[i].attributes.performance < 0 && tradesList[i].attributes.performance >= -0.25) {
        quarterDown++;
      } else if (tradesList[i].attributes.performance < -0.25 && tradesList[i].attributes.performance >= -0.5) {
        halfDown++;
      } else if (tradesList[i].attributes.performance < -0.5 && tradesList[i].attributes.performance >= -0.75) {
        threeQuartDown++;
      } else if (tradesList[i].attributes.performance < -0.75 && tradesList[i].attributes.performance >= -1) {
        fullDown++;
      }
    }
    setDataList({
      scratches: scratches,
      quarterUp: quarterUp,
      quarterDown: quarterDown,
      halfUp: halfUp,
      halfDown: halfDown,
      threeQuartUp: threeQuartUp,
      threeQuartDown: threeQuartDown,
      fullUp: fullUp,
      fullDown: fullDown,
      totalTrades: tradesList.length,
      tradesList: tradesList
    })
  }

  let tradesHead;
  if (loaded) {
    tradesHead = <TradeHeader/>
  }
  const tradesGrid = trades.map((item) => {
    if (trades !== null) {
      return (
        <Trade
          key={item.id}
          tradeID={item.id}
          attributes={item.attributes}
          deleteTrade={deleteTrade}
          />
      )
    }
  })

  const searchGrid = searchResults.map((item) => {
    return (
      <Trade
      key={item.id}
      tradeID={item.id}
      attributes={item.attributes}
      deleteTrade={deleteTrade}
      />
    );
  });

  return (
    <div className="home">
      <Header />
      <Form
        trade={newTrade}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="filter-stats-grid">
        <Filters
          searchList={searchList}
          submitSearch={submitSearch}
          handleSearchChange={handleSearchChange}
        />
        <Stats 
          dataList={dataList}
          avg={avg}
        />
      </div>
      <div className="trades-grid">
        {tradesHead}
        {tradesGrid}
      </div>
    </div>
  );
}

export default Trades;