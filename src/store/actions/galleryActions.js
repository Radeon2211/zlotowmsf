import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as uiActions from './uiActions';
import { maxQuantityPerPage } from '../../shared/constants';

export const setGalleries = (galleries, galleryCount) => ({
  type: actionTypes.SET_GALLERIES,
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

export const fetchGalleries = (pageNumber, year) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * maxQuantityPerPage.GALLERY;
      const { data, headers } = await axios.get(
        `/wp/v2/galleries?per_page=${maxQuantityPerPage.GALLERY}&offset=${offset}&before=${
          year + 1
        }-01-01T00:00:00&after=${year - 1}-12-31T23:59:59`,
      );
      dispatch(setGalleries(data, +headers['x-wp-total']));
      dispatch(uiActions.fetchSuccess());
    } catch (error) {
      dispatch(uiActions.fetchFail());
    }
  };
};

export const fetchGalleryDetails = (gallerySlug) => {
  return async (dispatch) => {
    dispatch(uiActions.fetchStart());
    try {
      const { data: galleryDetails } = await axios.get(`/wp/v2/galleries?slug=${gallerySlug}`);
      if (galleryDetails.length > 0) {
        const {
          data: { images },
        } = await axios.get(`/acf/v3/galleries/${galleryDetails[0].id}/images`);
        if (images) {
          const { data: galleryImages } = await axios.get(
            `/wp/v2/media?include=${images}&per_page=100`,
          );
          galleryDetails[0].images = galleryImages;
        } else {
          throw new Error();
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
