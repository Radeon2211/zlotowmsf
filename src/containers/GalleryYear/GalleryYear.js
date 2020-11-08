import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import Pagination from '../../components/Pagination/Pagination';
import HeadingImage from '../../components/UI/HeadingImage';
import GalleryList from './GalleryList/GalleryList';
import { headingImages, maxQuantityPerPage } from '../../shared/constants';

const GalleryYear = (props) => {
  const {
    match: {
      params: { year },
    },
  } = props;

  const { galleries, galleryCount } = useSelector((state) => state.gallery);

  const history = useHistory();
  const { search } = history.location;

  const dispatch = useDispatch();
  const onFetchGalleries = useCallback(
    (pageNumber, givenYear) => dispatch(actions.fetchGalleries(pageNumber, givenYear)),
    [dispatch],
  );
  const onClearGalleries = useCallback(() => dispatch(actions.setGalleries(null, 0)), [dispatch]);

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
    return () => onClearGalleries();
  }, [onFetchGalleries, search, year, history]);

  const numberOfPages = Math.ceil((galleryCount - 1) / maxQuantityPerPage.GALLERY);
  const pagination =
    numberOfPages > 1 ? (
      <Pagination itemQuantity={galleryCount} maxQuantityPerPage={maxQuantityPerPage.GALLERY} />
    ) : null;

  return (
    <FreeSides>
      <HeadingImage slug={headingImages.GALLERY} />
      <GalleryList galleries={galleries} galleriesYear={year} />
      {pagination}
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
