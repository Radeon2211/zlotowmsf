import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  isLoading: false,
  error: '',
};

const fetchStart = (state) => {
  return updateObject(state, { isLoading: true });
};

const fetchSuccess = (state) => {
  return updateObject(state, { isLoading: false, error: '' });
};

const fetchFail = (state, action) => {
  return updateObject(state, { isLoading: false, error: action.error });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return fetchStart(state);
    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(state);
    case actionTypes.FETCH_FAIL:
      return fetchFail(state, action);
    default:
      return state;
  }
};

export default uiReducer;
