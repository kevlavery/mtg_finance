import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import set from './modules/set/reducers';
import sets from './modules/sets/reducers';
import cards from './modules/card/reducers';
import query from './modules/search/reducers';

export default (history) => combineReducers({
  router: connectRouter(history),
  set,
  cards,
  sets,
  query,
});
