import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  isLoading: false,
  isError: false,
};

const fetchStart = (state) => {
  return updateObject(state, { isLoading: true });
};

const fetchSuccess = (state) => {
  return updateObject(state, { isLoading: false, isError: false });
};

const fetchFail = (state) => {
  return updateObject(state, { isLoading: false, isError: true });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return fetchStart(state);
    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(state);
    case actionTypes.FETCH_FAIL:
      return fetchFail(state);
    default:
      return state;
  }
};

export default uiReducer;
