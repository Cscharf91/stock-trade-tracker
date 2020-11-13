import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import Trades from './trades/Trades'
import Trade from './trade/Trade'

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Trades}/>
            <Route exact path="/trade/:id" component={Trade}/>
        </Switch>
    )
}

export default App;