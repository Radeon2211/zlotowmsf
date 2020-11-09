import * as actionTypes from '../../actions/actionTypes';
import communityReducer, { initialState } from './communityReducer';

describe('News reducer', () => {
  it('Should return default state', () => {
    expect(communityReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_NEWS_DETAILS', () => {
    const communityDetails = {
      title: 'test title',
    };
    expect(
      communityReducer(undefined, {
        type: actionTypes.SET_COMMUNITY_DETAILS,
        communityDetails,
      }),
    ).toEqual({
      ...initialState,
      communityDetails,
    });
  });

  it('Should return new state after SET_COMMUNITIES', () => {
    const communities = [{ id: 1 }, { id: 2 }];
    expect(
      communityReducer(undefined, {
        type: actionTypes.SET_COMMUNITIES,
        communities,
      }),
    ).toEqual({
      ...initialState,
      communities,
    });
  });
});
