import fetch from 'cross-fetch';
import configurationData from '../../data/configuration.json';
import * as types from './types';
import { handleErrors } from '../errors/apiError';

const requestSets = () => ({
  type: types.REQUEST,
});

const receiveSets = (sets) => ({
  type: types.RECEIVE,
  sets,
});

const setsError = (error) => ({
  type: types.ERROR,
  error,
});

export const fetchSet = () => async (dispatch) => {
  dispatch(requestSets());
  const { backEndURL } = configurationData;
  fetch(`${backEndURL}/sets`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => handleErrors(json))
    .then((json) => dispatch(receiveSets(json.sort())))
    .catch((error) => dispatch(setsError(error)));
};

export default fetchSet;
