import React, { useEffect, useState } from 'react';

const Stats = (props) => {
  return (
    <div className="stats-wrapper">
      <h3>Data</h3>
      <div className="grid">
        <div className="basic-stats">
          <p><strong>Total Trades: </strong>{props.dataList.totalTrades}</p>
          <p><strong className="green">+$0 - 0.25: </strong>{props.dataList.quarterUp}</p>
          <p><strong className="green">+$0.25 - 0.50: </strong>{props.dataList.halfUp}</p>
          <p><strong className="green">+$0.50 - 0.75: </strong>{props.dataList.threeQuartUp}</p>
          <p><strong className="green">+$0.75 - 1: </strong>{props.dataList.fullUp}</p>
        </div>
        <div className="basic-stats">
          <p><strong>Scratches: </strong>{props.dataList.scratches}</p>
          <p><strong className="red">-$0 - 0.25: </strong>{props.dataList.quarterDown}</p>
          <p><strong className="red">-$0.25 - 0.50: </strong>{props.dataList.halfDown}</p>
          <p><strong className="red">-$0.50 - 0.75: </strong>{props.dataList.threeQuartDown}</p>
          <p><strong className="red">-$0.75 - 1: </strong>{props.dataList.fullDown}</p>
        </div>
        <div className="win-percent">
            <p><strong>Average Per Trade: </strong></p>
            <h1>{props.avg === "Not Available" ? 'Not Available' : '$' + props.avg}</h1>
        </div>
      </div>
    </div>
  );
}

export default Stats;