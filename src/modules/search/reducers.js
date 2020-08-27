import orderBy from 'lodash/orderBy';
import {
  REQUEST,
  RECEIVE,
  SET_QUERY,
  SORT_RESULTS,
  ERROR,
} from './types';

export default function query(
  state = {
    isFetching: false,
    content: '',
    cards: [],
    error: '',
  },
  action,
) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isFetching: true };
    case RECEIVE:
      return { ...state, isFetching: false, cards: action.results };
    case SET_QUERY:
      return { ...state, content: action.content };
    case SORT_RESULTS: {
      console.log(action.sortKey);
      const cardSlice = state.cards.slice();
      console.log(cardSlice.cards.price.length);
      return {
        ...state,
        cards: orderBy(cardSlice, action.sortKey, action.order),
      };
    }
    case ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
