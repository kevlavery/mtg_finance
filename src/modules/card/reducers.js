import {
  REQUEST,
  RECEIVE,
  REQUEST_OTHERS,
  RECEIVE_OTHERS,
} from './types';

export default function cards(
  state = {
    isFetching: false,
    isFetchingOthers: false,
    items: {},
    current: {
      editions: [],
    },
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
        items: {
          ...state.items,
          [action.details.scryfallId]: {
            info: action.details,
          },
        },
      };
    case REQUEST_OTHERS:
      return { ...state, isFetchingOthers: true };
    case RECEIVE_OTHERS:
      return {
        ...state,
        isFetchingOthers: false,
        current: {
          editions: action.otherEditions,
        },
      };
    default:
      return state;
  }
}
