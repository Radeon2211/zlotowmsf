import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import Pagination from '../../components/Pagination/Pagination';
import HeadingImage from '../../components/UI/HeadingImage';
import Loader from '../../components/UI/Loader';
import Heading from '../../components/UI/Heading/Heading';
import CommunityAndGalleryList from '../../components/CommunityAndGalleryList/ComumunityAndGalleryList';
import { headingImages, maxQuantityPerPage } from '../../shared/constants';

const GalleryYear = (props) => {
  const {
    match: {
      params: { year },
    },
  } = props;

  const { galleries, galleryCount } = useSelector((state) => state.gallery);
  const { isError } = useSelector((state) => state.ui);

  const history = useHistory();
  const { search } = history.location;

  const dispatch = useDispatch();
  const onFetchGalleries = useCallback(
    (pageNumber, givenYear) => dispatch(actions.fetchGalleries(pageNumber, givenYear)),
    [dispatch],
  );
  const onClearGalleries = useCallback(() => dispatch(actions.setGalleries(null, 0)), [dispatch]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    const urlYear = +year;
    if (!Number.isInteger(urlYear)) {
      const actualYear = new Date().getFullYear();
      history.replace(`/galeria/${actualYear}`);
    } else {
      const { p: urlPage } = queryString.parse(search);
      const urlPageNumber = +urlPage || 1;
      onFetchGalleries(urlPageNumber, urlYear);
    }
    return () => {
      onClearGalleries();
      onClearError();
    };
  }, [onFetchGalleries, onClearGalleries, onClearError, search, year, history]);

  let mainContent = <Loader />;
  if (galleries) {
    if (galleries.length <= 0) {
      mainContent = (
        <Heading variant="h3" align="center" data-test="not-found">
          Nie znaleziono żadnych galerii
        </Heading>
      );
    } else {
      const numberOfPages = Math.ceil((galleryCount - 1) / maxQuantityPerPage.GALLERY);
      const pagination =
        numberOfPages > 1 ? (
          <Pagination itemQuantity={galleryCount} maxQuantityPerPage={maxQuantityPerPage.GALLERY} />
        ) : null;

      mainContent = (
        <>
          <Heading variant="h4" align="center" margin="medium" data-test="year">
            {`Galerie zdjęć - rok ${year}`}
          </Heading>
          <CommunityAndGalleryList
            items={galleries}
            overlayText="Zobacz zdjęcia"
            mainPath="/galeria/id/"
          />
          {pagination}
        </>
      );
    }
  }

  if (isError) {
    mainContent = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem listy galerii
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

GalleryYear.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default GalleryYear;
