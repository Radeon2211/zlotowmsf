import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  basic: null,
  sites: {},
  priests: null,
};

const setBasicData = (state, action) => {
  return updateObject(state, { basic: action.basic });
};

const setSite = (state, action) => {
  const updatedSites = { ...state.sites, ...action.site };
  return updateObject(state, { sites: updatedSites });
};

const setPriests = (state, action) => {
  return updateObject(state, { priests: action.priests });
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BASIC_DATA:
      return setBasicData(state, action);
    case actionTypes.SET_SITE:
      return setSite(state, action);
    case actionTypes.SET_PRIESTS:
      return setPriests(state, action);
    default:
      return state;
  }
};

export default dataReducer;
