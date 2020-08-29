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
      let cardSlice = state.cards.slice();
      // reverse card prices so that element zero is the most recent
      if (action.sortKey === "price[0].value") {
        cardSlice.forEach(element => {
          element.price.reverse();
        });
      }
      cardSlice = orderBy(cardSlice, action.sortKey, action.order);
      // set card prices back to original order after cards are sorted
      if (action.sortKey === "price[0].value") {
        cardSlice.forEach(element => {
          element.price.reverse();
        });
      }
      return {
        ...state,
        cards: cardSlice,
      };
    }
    case ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
