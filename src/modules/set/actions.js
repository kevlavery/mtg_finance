import fetch from 'cross-fetch';
import configurationData from '../../data/configuration.json';
import * as types from './types';
import { receiveCard } from '../card/actions';

const requestSet = () => ({
  type: types.REQUEST,
});

const receiveSet = (set) => ({
  type: types.RECEIVE,
  cards: set,
});

const setTotalCards = (count) => ({
  type: types.SET_TOTAL,
  total: count,
});

const setError = (error) => ({
  type: types.ERROR,
  error,
});

export const sortCards = (order, sortKey) => ({
  type: types.SORT_CARDS,
  order,
  sortKey,
});

export const setPosition = (position) => ({
  type: types.SET_POSITION,
  position,
});

export const fetchSet = (set) => async (dispatch) => {
  dispatch(requestSet());
  const { backEndURL } = configurationData;

  return fetch(`${backEndURL}/sets/${set}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      dispatch(setTotalCards(json.length));
      json.forEach((card) => dispatch(receiveCard(card)));
      dispatch(receiveSet(json));
    })
    .catch((error) => dispatch(setError(error)));
};
