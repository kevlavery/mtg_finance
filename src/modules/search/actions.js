import fetch from 'cross-fetch';
import * as configurationData from '../../data/configuration.json';
import * as types from './types';
import { receiveCard } from '../card/actions';
import { handleErrors } from '../errors/apiError';

const requestResults = () => ({
  type: types.REQUEST,
});

const receiveResults = (results) => ({
  type: types.RECEIVE,
  results,
});

// need to test that this works properly at some point
const searchError = (error) => ({
  type: types.ERROR,
  error,
});

export const submitQuery = () => async (dispatch, getState) => {
  dispatch(requestResults());
  const { backEndURL } = configurationData;
  const { query } = getState();
  fetch(`${backEndURL}/card`,
    {
      method: 'POST',
      body: JSON.stringify({ query: query.content }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => handleErrors(json))
    .then((json) => {
      json.forEach((card) => dispatch(receiveCard(card)));
      dispatch(receiveResults(json));
    })
    .catch((error) => dispatch(searchError(error)));
};

export const setQuery = (query) => ({
  type: types.SET_QUERY,
  content: query,
});

export const sortResults = (order, sortKey) => ({
  type: types.SORT_RESULTS,
  order,
  sortKey,
});
