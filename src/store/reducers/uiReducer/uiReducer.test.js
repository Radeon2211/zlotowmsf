import * as actionTypes from '../../actions/actionTypes';
import uiReducer, { initialState } from './uiReducer';

describe('ui reducer', () => {
  it('Should return default state', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after FETCH_START', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.FETCH_START,
      }),
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Should return new state after FETCH_SUCCESS', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.FETCH_SUCCESS,
      }),
    ).toEqual(initialState);
  });

  it('Should return new state after FETCH_FAIL', () => {
    expect(
      uiReducer(undefined, {
        type: actionTypes.FETCH_FAIL,
      }),
    ).toEqual({
      ...initialState,
      isError: true,
    });
  });
});
