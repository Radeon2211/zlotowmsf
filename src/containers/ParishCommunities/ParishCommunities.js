import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import HeadingImage from '../../components/UI/HeadingImage';
import Loader from '../../components/UI/Loader';
import Heading from '../../components/UI/Heading/Heading';
import CommunityAndGalleryList from '../../components/CommunityAndGalleryList/CommunityAndGalleryList';
import { headingImages } from '../../shared/constants';

const ParishCommunities = () => {
  const { communities } = useSelector((state) => state.community);
  const { isError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchCommunities = useCallback(() => dispatch(actions.fetchCommunities()), [dispatch]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    if (!communities) {
      onFetchCommunities();
    }
    return () => onClearError();
  }, [onFetchCommunities, onClearError, communities]);

  let mainContent = <Loader />;
  if (communities) {
    if (communities.length <= 0) {
      mainContent = (
        <Heading variant="h3" align="center" data-test="not-found">
          Nie znaleziono żadnych galerii
        </Heading>
      );
    } else {
      mainContent = (
        <CommunityAndGalleryList
          items={communities}
          overlayText="Zobacz szczegóły"
          mainPath="/parafia/wspolnoty-parafialne/"
        />
      );
    }
  }

  if (isError) {
    mainContent = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem wspólnot parafialnych
      </Heading>
    );
  }

  return (
    <FreeSides>
      <HeadingImage slug={headingImages.COMMUNITIES} />
      {mainContent}
    </FreeSides>
  );
};

export default ParishCommunities;
