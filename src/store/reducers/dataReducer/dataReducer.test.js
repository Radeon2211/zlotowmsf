import * as actionTypes from '../../actions/actionTypes';
import dataReducer, { initialState } from './dataReducer';

const createState = (data) => ({
  ...initialState,
  ...data,
});

describe('Data reducer', () => {
  it('Should return default state', () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_NEWS_DETAILS', () => {
    const newsDetails = {
      title: 'test title',
    };
    expect(
      dataReducer(undefined, {
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
      dataReducer(undefined, {
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

  it('Should return new state after SET_BASIC_DATA', () => {
    const basic = {
      slides: [{ id: 1 }, { id: 2 }],
      lastNewsSlug: 'test-slug',
    };
    expect(
      dataReducer(undefined, {
        type: actionTypes.SET_BASIC_DATA,
        basic,
      }),
    ).toEqual({
      ...initialState,
      basic,
    });
  });

  it('Should return new state after first SET_SITE', () => {
    const site = { testSlug: { id: 1 } };
    expect(
      dataReducer(undefined, {
        type: actionTypes.SET_SITE,
        site,
      }),
    ).toEqual({
      ...initialState,
      sites: site,
    });
  });

  it('Should return new state after second SET_SITE', () => {
    const firstSite = { testSlug1: { id: 1 } };
    const secondSite = { testSlug2: { id: 2 } };
    const correctSites = {
      ...firstSite,
      ...secondSite,
    };
    const state = createState({ sites: firstSite });
    expect(
      dataReducer(state, {
        type: actionTypes.SET_SITE,
        site: secondSite,
      }),
    ).toEqual({
      ...initialState,
      sites: correctSites,
    });
  });

  it('Should return new state after FETCH_START', () => {
    expect(
      dataReducer(undefined, {
        type: actionTypes.FETCH_START,
      }),
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Should return new state after FETCH_SUCCESS', () => {
    expect(
      dataReducer(undefined, {
        type: actionTypes.FETCH_SUCCESS,
      }),
    ).toEqual(initialState);
  });

  it('Should return new state after FETCH_FAIL', () => {
    const error = 'test error';
    expect(
      dataReducer(undefined, {
        type: actionTypes.FETCH_FAIL,
        error,
      }),
    ).toEqual({
      ...initialState,
      error,
    });
  });
});
