import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  news: null,
  newsCount: 0,
  newsDetails: null,
};

const setNews = (state, action) => {
  return updateObject(state, { news: action.news, newsCount: action.newsCount });
};

const setNewsDetails = (state, action) => {
  return updateObject(state, { newsDetails: action.newsDetails });
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEWS:
      return setNews(state, action);
    case actionTypes.SET_NEWS_DETAILS:
      return setNewsDetails(state, action);
    default:
      return state;
  }
};

export default newsReducer;
