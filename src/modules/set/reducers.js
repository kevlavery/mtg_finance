import {
  REQUEST,
  RECEIVE,
  SET_TOTAL,
  SET_POSITION,
  SORT_CARDS,
  ERROR,
} from './types';

const deep_value = (obj, path) => 
  path
    .replace(/\[|\]\.?/g, '.')
    .split('.')
    .filter(s => s)
    .reduce((acc, val) => acc && acc[val], obj);

function compare(property, ascending) {
  return function (a, b) {
    a = deep_value(a, property);
    b = deep_value(b, property);

    // equal items sort equally
    if (a === b) {
        return 0;
    }
    // nulls sort after anything else
    else if (a === null) {
        return 1;
    }
    else if (b === null) {
        return -1;
    }
    // otherwise, if we're ascending, lowest sorts first
    else if (ascending === "asc") {
      return a < b ? -1 : 1;
    }
    // if descending, highest sorts first
    else { 
      return a < b ? 1 : -1;
    }
  };
}

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
      cardSlice = cardSlice.sort(compare(action.sortKey, action.order));
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
