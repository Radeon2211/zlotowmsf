import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/indexActions';
import CommunityAndGalleryDetails from '../components/CommunityAndGalleryDetails/CommunityAndGalleryDetails';
import { siteNames } from '../shared/constants';

const GalleryDetails = (props) => {
  const {
    match: {
      params: { slug },
    },
  } = props;

  const { galleryDetails } = useSelector((state) => state.gallery);
  const { isError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchGalleryDetails = useCallback(
    (gallerySlug) => dispatch(actions.fetchGalleryDetails(gallerySlug)),
    [dispatch],
  );
  const onClearGalleryDetails = useCallback(() => dispatch(actions.setGalleryDetails(null)), [
    dispatch,
  ]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchGalleryDetails(slug);
    return () => {
      onClearGalleryDetails();
      onClearError();
    };
  }, [onFetchGalleryDetails, onClearGalleryDetails, onClearError, slug]);

  return (
    <CommunityAndGalleryDetails
      data={galleryDetails}
      siteName={siteNames.GALLERY_DETAILS}
      isError={isError}
    />
  );
};

GalleryDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default GalleryDetails;
