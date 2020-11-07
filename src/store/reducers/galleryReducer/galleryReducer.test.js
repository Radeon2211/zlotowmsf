import * as actionTypes from '../../actions/actionTypes';
import galleryReducer, { initialState } from './galleryReducer';

describe('Gallery reducer', () => {
  it('Should return default state', () => {
    expect(galleryReducer(undefined, {})).toEqual(initialState);
  });

  it('Should return new state after SET_GALLERIES', () => {
    const galleries = [
      {
        title: 'test gallery',
      },
    ];
    const galleryCount = 1;
    expect(
      galleryReducer(undefined, {
        type: actionTypes.SET_GALLERIES,
        galleries,
        galleryCount,
      }),
    ).toEqual({
      ...initialState,
      galleries,
      galleryCount,
    });
  });

  it('Should return new state after SET_GALLERY_DETAILS', () => {
    const galleryDetails = { title: 'test title' };
    expect(
      galleryReducer(undefined, {
        type: actionTypes.SET_GALLERY_DETAILS,
        galleryDetails,
      }),
    ).toEqual({
      ...initialState,
      galleryDetails,
    });
  });

  it('Should return new state after SET_GALLERIES_DATES', () => {
    const oldestGalleryYear = 2017;
    const newestGalleryYear = 2020;
    expect(
      galleryReducer(undefined, {
        type: actionTypes.SET_GALLERIES_DATES,
        oldestGalleryYear,
        newestGalleryYear,
      }),
    ).toEqual({
      ...initialState,
      oldestGalleryYear,
      newestGalleryYear,
    });
  });
});
