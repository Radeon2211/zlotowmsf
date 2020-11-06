import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../shared/utility';

export const initialState = {
  galleries: null,
  galleryCount: 0,
  galleryDetails: null,
  oldestGalleryYear: null,
  newestGalleryYear: null,
};

const setGalleries = (state, action) => {
  return updateObject(state, { galleries: action.galleries, galleryCount: action.galleryCount });
};

const setGalleryDetails = (state, action) => {
  return updateObject(state, { galleryDetails: action.galleryDetails });
};

const setGalleriesDates = (state, action) => {
  return updateObject(state, {
    oldestGalleryYear: action.oldestGalleryYear,
    newestGalleryYear: action.newestGalleryYear,
  });
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GALLERIES:
      return setGalleries(state, action);
    case actionTypes.SET_GALLERY_DETAILS:
      return setGalleryDetails(state, action);
    case actionTypes.SET_GALLERIES_DATES:
      return setGalleriesDates(state, action);
    default:
      return state;
  }
};

export default galleryReducer;
