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
      console.log(action.sortKey);
      console.log(state);
      const cardSlice = state.cards.slice();
      //console.log(cardSlice.cards[0].price.length);
      
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
