import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SC from './Gallery.sc';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import HeadingImage from '../../components/UI/HeadingImage';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import { headingImages } from '../../shared/constants';

const Gallery = () => {
  const { oldestGalleryYear, newestGalleryYear } = useSelector((state) => state.gallery);
  const { isLoading, isError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchGalleriesDates = useCallback(() => dispatch(actions.fetchGalleriesDates()), [
    dispatch,
  ]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    if (!oldestGalleryYear) {
      onFetchGalleriesDates();
    }
    return () => onClearError();
  }, [oldestGalleryYear, onFetchGalleriesDates, onClearError]);

  let mainContent = isLoading ? <Loader /> : null;
  if (oldestGalleryYear) {
    const yearListPanels = [];
    for (let i = newestGalleryYear; i >= oldestGalleryYear; i -= 1) {
      yearListPanels.push(
        <SC.YearPanel key={i} to={`/galeria/${i}`}>
          <Heading variant="h3">{i}</Heading>
        </SC.YearPanel>,
      );
    }
    mainContent = (
      <>
        <Heading variant="h4" margin="medium" align="center" data-test="choose-text">
          Wybierz, z którego roku chcesz zobaczyć zdjęcia
        </Heading>
        <SC.YearList>{yearListPanels}</SC.YearList>
      </>
    );
  }

  if (isError) {
    mainContent = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem galerii
      </Heading>
    );
  }

  return (
    <FreeSides>
      <HeadingImage slug={headingImages.GALLERY} />
      {mainContent}
    </FreeSides>
  );
};

export default Gallery;
