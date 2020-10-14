import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { MAX_QUANTITY_PER_PAGE } from '../../shared/constants';

export const setBasicData = (data) => ({
  type: actionTypes.SET_BASIC_DATA,
  basic: data,
});

export const setSite = (site) => ({
  type: actionTypes.SET_SITE,
  site,
});

export const setNews = (news, newsCount) => ({
  type: actionTypes.SET_NEWS,
  news,
  newsCount,
});

export const setNewsDetails = (newsDetails) => ({
  type: actionTypes.SET_NEWS_DETAILS,
  newsDetails,
});

export const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

export const fetchSuccess = () => ({
  type: actionTypes.FETCH_SUCCESS,
});

export const fetchFail = () => ({
  type: actionTypes.FETCH_FAIL,
});

export const fetchBasicData = () => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const fetchSlides = axios.get('/wp/v2/slides?order=asc');
      const fetchLastNews = axios.get('/wp/v2/posts?per_page=1');
      const [{ value: { data: slides } }, { value: { data: news } }] = await Promise.allSettled([fetchSlides, fetchLastNews]);
      let lastNewsSlug = '';
      if (news.length > 0) {
        lastNewsSlug = news[0].slug;
      }
      dispatch(setBasicData({ slides, lastNewsSlug }));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchFail());
    }
  };
};

export const fetchSite = (siteSlug) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`/wp/v2/pages?slug=${siteSlug}`);
      dispatch(setSite({ [siteSlug]: data[0] }));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchFail());
    }
  };
};

export const fetchNews = (pageNumber, oneExtra) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const perPage = oneExtra ? MAX_QUANTITY_PER_PAGE + 1 : MAX_QUANTITY_PER_PAGE;
      const offset = pageNumber === 1 ? 0 : ((pageNumber - 1) * MAX_QUANTITY_PER_PAGE) + 1;
      const { data, headers } = await axios.get(`/wp/v2/posts?per_page=${perPage}&offset=${offset}`);
      dispatch(setNews(data, +headers['x-wp-total']));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(setNews([], 0));
      dispatch(fetchFail());
    }
  };
};

export const fetchNewsDetails = (newsSlug) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data: newsDetails } = await axios.get(`/wp/v2/posts?slug=${newsSlug}`);
      if (newsDetails.length > 0) {
        const { data: { gallery }} = await axios.get(`/acf/v3/posts/${newsDetails[0].id}/gallery`);
        if (gallery) {
          const { data: images } = await axios.get(`/wp/v2/media?include=${gallery}`);
          newsDetails[0].images = images;
        }
        dispatch(setNewsDetails(newsDetails[0]));
      } else {
        dispatch(setNewsDetails(undefined));
      }
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchFail());
    }
  };
};
