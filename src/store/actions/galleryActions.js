import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as uiActions from './uiActions';
import { MAX_QUANTITY_PER_PAGE } from '../../shared/constants';

export const setGalleries = (galleries, galleryCount) => ({
  type: actionTypes.SET_NEWS,
  galleries,
  galleryCount,
});

export const setGalleryDetails = (galleryDetails) => ({
  type: actionTypes.SET_GALLERY_DETAILS,
  galleryDetails,
});

export const setGalleriesDates = (oldestGalleryYear, newestGalleryYear) => ({
  type: actionTypes.SET_GALLERIES_DATES,
  oldestGalleryYear,
  newestGalleryYear,
});

export const fetchGalleries = (pageNumber, oneExtra) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const perPage = oneExtra ? MAX_QUANTITY_PER_PAGE + 1 : MAX_QUANTITY_PER_PAGE;
      const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * MAX_QUANTITY_PER_PAGE + 1;
      const { data, headers } = await axios.get(
        `/wp/v2/posts?per_page=${perPage}&offset=${offset}`,
      );
      dispatch(setGalleries(data, +headers['x-wp-total']));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(setGalleries([], 0));
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchGalleryDetails = (newsSlug) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data: galleryDetails } = await axios.get(`/wp/v2/posts?slug=${newsSlug}`);
      if (galleryDetails.length > 0) {
        const {
          data: { gallery },
        } = await axios.get(`/acf/v3/posts/${galleryDetails[0].id}/gallery`);
        if (gallery) {
          const { data: images } = await axios.get(`/wp/v2/media?include=${gallery}&per_page=100`);
          galleryDetails[0].images = images;
        }
        dispatch(setGalleryDetails(galleryDetails[0]));
      } else {
        dispatch(setGalleryDetails(undefined));
      }
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchGalleriesDates = () => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const fetchOldest = await axios.get(
        '/wp/v2/galleries?filter[orderby]=date&order=asc&per_page=1',
      );
      const fetchNewest = await axios.get(
        '/wp/v2/galleries?filter[orderby]=date&order=desc&per_page=1',
      );
      const [
        {
          value: { data: oldestGallery },
        },
        {
          value: { data: newestGallery },
        },
      ] = await Promise.allSettled([fetchOldest, fetchNewest]);
      if (oldestGallery.length > 0 && newestGallery.length > 0) {
        const oldestYear = new Date(oldestGallery[0].date).getFullYear();
        const newestYear = new Date(newestGallery[0].date).getFullYear();
        dispatch(setGalleriesDates(oldestYear, newestYear));
      } else {
        dispatch(setGalleriesDates(undefined, undefined));
      }
      dispatch(setGalleryDetails(undefined));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};
