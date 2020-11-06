import * as actionTypes from './actionTypes';

export const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

export const fetchSuccess = () => ({
  type: actionTypes.FETCH_SUCCESS,
});

export const fetchFail = () => ({
  type: actionTypes.FETCH_FAIL,
});
