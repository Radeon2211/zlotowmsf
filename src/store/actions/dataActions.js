import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setBasicData = (data) => ({
  type: actionTypes.SET_BASIC_DATA,
  basic: data,
});

export const setSite = (site) => ({
  type: actionTypes.SET_SITE,
  site,
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
      // const res = await axios.get(
      //   '/wp/v2/galleries?after=2018-12-31T23:59:59&before=2020-01-01T00:00:00',
      // );
      // console.log(res.data);
      const fetchSlides = axios.get('/wp/v2/slides?order=asc');
      const fetchLastestNews = axios.get('/wp/v2/posts?per_page=1');
      const [
        {
          value: { data: slides },
        },
        {
          value: { data: news },
        },
      ] = await Promise.allSettled([fetchSlides, fetchLastestNews]);
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
      dispatch(setBasicData({ slides, latestNews }));
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
