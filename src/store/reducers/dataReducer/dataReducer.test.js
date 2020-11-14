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

  it('Should return new state after SET_BASIC_DATA', () => {
    const basic = {
      slides: [{ id: 1 }, { id: 2 }],
      lastNewsSlug: 'test-slug',
      extraInfo: { privacyPolicy: 'test privacy policy' },
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

  it('Should return new state after SET_PRIESTS', () => {
    const priests = [{ id: 1 }];
    expect(
      dataReducer(undefined, {
        type: actionTypes.SET_PRIESTS,
        priests,
      }),
    ).toEqual({
      ...initialState,
      priests,
    });
  });
});
