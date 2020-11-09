import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as uiActions from './uiActions';

export const setCommunities = (communities) => ({
  type: actionTypes.SET_COMMUNITIES,
  communities,
});

export const setCommunityDetails = (communityDetails) => ({
  type: actionTypes.SET_COMMUNITY_DETAILS,
  communityDetails,
});

export const fetchCommunities = () => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data } = await axios.get(`/wp/v2/communities`);
      dispatch(setCommunities(data));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchCommunityDetails = (communitySlug) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data: communityDetails } = await axios.get(
        `/wp/v2/communities?slug=${communitySlug}`,
      );
      if (communityDetails.length > 0) {
        const {
          data: { images },
        } = await axios.get(`/acf/v3/communities/${communityDetails[0].id}/images`);
        if (images) {
          const { data: communityImages } = await axios.get(
            `/wp/v2/media?include=${images}&per_page=100`,
          );
          communityDetails[0].images = communityImages;
        }
        dispatch(setCommunityDetails(communityDetails[0]));
      } else {
        dispatch(setCommunityDetails(undefined));
      }
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};
