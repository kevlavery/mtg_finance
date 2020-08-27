import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import MTGFinance from './mtgFinance';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <MTGFinance />
      </Router>
    </ConnectedRouter>
  </Provider>
);

export default App;
