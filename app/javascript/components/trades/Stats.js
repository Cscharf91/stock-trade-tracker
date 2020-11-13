import React from 'react';

const Stats = (props) => {
  const findWinPercentage = () => {
    const wins = props.dataList.halfWins + props.dataList.fullWins;
    const total = props.dataList.halfWins + props.dataList.fullWins + props.dataList.halfLosses + props.dataList.fullLosses;
    const stats = Math.round((wins / total) * 100);
    return stats;
  }

  // const findData = () => {
  //   if (!props.dataList.halfWins && !props.dataList.fullWins && !props.dataList.halfLosses && !props.dataList.fullLosses) {
  //     setTimeout(findWinPercentage(), 1000);
  //   } else {
  //     return findWinPercentage();
  //   }
  // }

  let winPercentage = findWinPercentage();

  return (
    <div className="stats-wrapper">
      <h3>Data</h3>
      <div className="grid">
        <div className="basic-stats">
          <p><strong>Half Wins: </strong>{props.dataList.halfWins}</p>
          <p><strong>Full Wins: </strong>{props.dataList.fullWins}</p>
          <p><strong>Half Losses: </strong>{props.dataList.halfLosses}</p>
          <p><strong>Full Losses: </strong>{props.dataList.fullLosses}</p>
        </div>
        <div className="win-percent">
          <p><strong>Overall Win %: </strong></p>
          <h1>{winPercentage}</h1>
        </div>
      </div>
    </div>
  );
}

export default Stats;