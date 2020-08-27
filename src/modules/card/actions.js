import fetch from 'cross-fetch';
import * as configurationData from '../../data/configuration.json';
import * as types from './types';

const requestCard = () => ({
  type: types.REQUEST,
});

export const receiveCard = (cardDetails) => ({
  type: types.RECEIVE,
  details: cardDetails,
});

const requestOtherEditions = () => ({
  type: types.REQUEST_OTHERS,
});

const receiveOtherEditions = (otherEditions) => ({
  type: types.RECEIVE_OTHERS,
  otherEditions,
});

export const fetchCard = (productId) => async (dispatch) => {
  dispatch(requestCard());
  const { backEndURL } = configurationData;

  return fetch(`${backEndURL}/card/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => response.json())
    .then((values) => dispatch(receiveCard(values)));
};

export const findOtherEditions = (name) => async (dispatch) => {
  dispatch(requestOtherEditions);
  const { backEndURL } = configurationData;
  const query = `^${name}$`;
  return fetch(`${backEndURL}/card`,
    {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      dispatch(receiveOtherEditions(json));
    });
};
