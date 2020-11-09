import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  communities: null,
  communityDetails: null,
};

const setCommunity = (state, action) => {
  return updateObject(state, { communities: action.communities });
};

const setCommunityDetails = (state, action) => {
  return updateObject(state, { communityDetails: action.communityDetails });
};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMMUNITIES:
      return setCommunity(state, action);
    case actionTypes.SET_COMMUNITY_DETAILS:
      return setCommunityDetails(state, action);
    default:
      return state;
  }
};

export default communityReducer;
