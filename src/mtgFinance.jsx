import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Sets from './modules/sets/component';
import SetContainer from './modules/set/container';
import CardHistory from './modules/card/historyContainer';
import SearchResults from './modules/search/resultsComponent';
import Home from './modules/home/component';
import MTGNav from './modules/navigation/navbar';

const mtgFinance = () => (
  <div>
    <MTGNav />
    <Switch>
      <Route path="/(|home)" component={Home} />
      <Route path="/sets" component={Sets} />
      <Route path="/set/:id" component={SetContainer} />
      <Route path="/card/:scryfallId" component={CardHistory} />
      <Route path="/search" component={SearchResults} />
    </Switch>
  </div>
);


export default withRouter(mtgFinance);
