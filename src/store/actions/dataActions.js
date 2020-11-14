import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as uiActions from './uiActions';

export const setBasicData = (data) => ({
  type: actionTypes.SET_BASIC_DATA,
  basic: data,
});

export const setSite = (site) => ({
  type: actionTypes.SET_SITE,
  site,
});

export const setPriests = (priests) => ({
  type: actionTypes.SET_PRIESTS,
  priests,
});

export const fetchBasicData = () => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const fetchSlides = axios.get('/wp/v2/slides?order=asc');
      const fetchLastestNews = axios.get('/wp/v2/posts?per_page=1');
      const fetchExtraInfo = axios.get('/wp/v2/extra_info?per_page=1');
      const [
        {
          value: { data: slides },
        },
        {
          value: { data: news },
        },
        {
          value: {
            data: [{ acf: extraInfo }],
          },
        },
      ] = await Promise.allSettled([fetchSlides, fetchLastestNews, fetchExtraInfo]);
      const latestNews = {
        title: '',
        slug: '',
        thumbnail: '',
      };
      if (news.length > 0) {
        latestNews.title = news[0].title.rendered;
        latestNews.slug = news[0].slug;
        latestNews.thumbnail = news[0].acf.thumbnail;
      }
      dispatch(setBasicData({ slides, latestNews, extraInfo }));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchSite = (siteSlug) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data } = await axios.get(`/wp/v2/pages?slug=${siteSlug}`);
      dispatch(setSite({ [siteSlug]: data[0] }));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchPriests = () => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data } = await axios.get(`/wp/v2/priests`);
      dispatch(setPriests(data));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};
