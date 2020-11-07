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
  const { isLoading, error } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchGalleriesDates = useCallback(() => dispatch(actions.fetchGalleriesDates(null)), [
    dispatch,
  ]);

  useEffect(() => {
    if (oldestGalleryYear) return;
    onFetchGalleriesDates();
  }, [oldestGalleryYear, onFetchGalleriesDates]);

  let yearList = isLoading ? <Loader /> : null;
  if (oldestGalleryYear) {
    const yearListPanels = [];
    for (let i = newestGalleryYear; i >= oldestGalleryYear; i -= 1) {
      yearListPanels.push(
        <SC.YearPanel key={i} to={`/galeria/${i}`}>
          <Heading variant="h3">{i}</Heading>
        </SC.YearPanel>,
      );
    }
    yearList = <SC.YearList>{yearListPanels}</SC.YearList>;
  }

  if (error) {
    yearList = (
      <Heading variant="h3" align="center">
        Wystąpił problem z pobieraniem informacji o galerii
      </Heading>
    );
  }

  return (
    <FreeSides>
      <HeadingImage slug={headingImages.GALLERY} />
      {!error && (
        <Heading variant="h4" margin="medium" align="center">
          Wybierz, z którego roku chcesz zobaczyć zdjęcia
        </Heading>
      )}
      {yearList}
    </FreeSides>
  );
};

export default Gallery;
