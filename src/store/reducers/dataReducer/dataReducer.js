import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
  basic: null,
  sites: {},
  isLoading: false,
  error: '',
};

const setBasicData = (state, action) => {
  return updateObject(state, { basic: action.basic });
};

const setSite = (state, action) => {
  const updatedSites = { ...state.sites, ...action.site };
  return updateObject(state, { sites: updatedSites });
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

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BASIC_DATA:
      return setBasicData(state, action);
    case actionTypes.SET_SITE:
      return setSite(state, action);
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

export default dataReducer;