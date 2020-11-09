import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/indexActions';
import CommunityAndGalleryDetails from '../components/CommunityAndGalleryDetails/CommunityAndGalleryDetails';
import { siteNames } from '../shared/constants';

const ParishCommunityDetails = (props) => {
  const {
    match: {
      params: { slug },
    },
  } = props;

  const { communityDetails } = useSelector((state) => state.community);
  const { isError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchCommunityDetails = useCallback(
    (communitySlug) => dispatch(actions.fetchCommunityDetails(communitySlug)),
    [dispatch],
  );
  const onClearCommunityDetails = useCallback(() => dispatch(actions.setCommunityDetails(null)), [
    dispatch,
  ]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchCommunityDetails(slug);
    return () => {
      onClearCommunityDetails();
      onClearError();
    };
  }, [onFetchCommunityDetails, onClearCommunityDetails, onClearError, slug]);

  return (
    <CommunityAndGalleryDetails
      data={communityDetails}
      siteName={siteNames.PARISH_COMMUNITY_DETAILS}
      isError={isError}
    />
  );
};

ParishCommunityDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ParishCommunityDetails;
