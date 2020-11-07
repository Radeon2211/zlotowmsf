import * as actionTypes from '../../actions/actionTypes';
import newsReducer, { initialState } from './newsReducer';

describe('News reducer', () => {
  it('Should return default state', () => {
    expect(newsReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_NEWS_DETAILS', () => {
    const newsDetails = {
      title: 'test title',
    };
    expect(
      newsReducer(undefined, {
        type: actionTypes.SET_NEWS_DETAILS,
        newsDetails,
      }),
    ).toEqual({
      ...initialState,
      newsDetails,
    });
  });

  it('Should return new state after SET_NEWS', () => {
    const news = [{ id: 1 }, { id: 2 }];
    const newsCount = 2;
    expect(
      newsReducer(undefined, {
        type: actionTypes.SET_NEWS,
        news,
        newsCount,
      }),
    ).toEqual({
      ...initialState,
      news,
      newsCount,
    });
  });
});
