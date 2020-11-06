import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as uiActions from './uiActions';
import { MAX_QUANTITY_PER_PAGE } from '../../shared/constants';

export const setNews = (news, newsCount) => ({
  type: actionTypes.SET_NEWS,
  news,
  newsCount,
});

export const setNewsDetails = (newsDetails) => ({
  type: actionTypes.SET_NEWS_DETAILS,
  newsDetails,
});

export const fetchNews = (pageNumber, oneExtra) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const perPage = oneExtra ? MAX_QUANTITY_PER_PAGE + 1 : MAX_QUANTITY_PER_PAGE;
      const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_QUANTITY_PER_PAGE + 1;
      const { data, headers } = await axios.get(
        `/wp/v2/posts?per_page=${perPage}&offset=${offset}`,
      );
      dispatch(setNews(data, +headers['x-wp-total']));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(setNews([], 0));
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchNewsDetails = (newsSlug) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data: newsDetails } = await axios.get(`/wp/v2/posts?slug=${newsSlug}`);
      if (newsDetails.length > 0) {
        const {
          data: { gallery },
        } = await axios.get(`/acf/v3/posts/${newsDetails[0].id}/gallery`);
        if (gallery) {
          const { data: images } = await axios.get(`/wp/v2/media?include=${gallery}&per_page=100`);
          newsDetails[0].images = images;
        }
        dispatch(setNewsDetails(newsDetails[0]));
      } else {
        dispatch(setNewsDetails(undefined));
      }
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};
