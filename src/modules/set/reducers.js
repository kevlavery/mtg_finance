import orderBy from 'lodash/orderBy';
import {
  REQUEST,
  RECEIVE,
  SET_TOTAL,
  SET_POSITION,
  SORT_CARDS,
  ERROR,
} from './types';

export default function set(
  state = {
    isFetching: false,
    cards: null,
    total: 0,
    position: 1,
  },
  action,
) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isFetching: true };
    case RECEIVE:
      return {
        ...state,
        isFetching: false,
        cards: action.cards,
      };
    case SET_TOTAL:
      return { ...state, total: action.total };
    case SET_POSITION:
      return { ...state, position: action.position };
    case SORT_CARDS: {
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
