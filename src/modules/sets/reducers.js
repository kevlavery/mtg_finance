import {
  REQUEST,
  RECEIVE,
  ERROR,
} from './types';

export default function sets(
  state = {
    isFetching: false,
    names: [],
    error: '',
  },
  action,
) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isFetching: true };
    case RECEIVE:
      return { ...state, isFetching: false, names: action.sets };
    case ERROR:
      return { ...state, isFetching: false, error: action.error.details };
    default:
      return state;
  }
}
