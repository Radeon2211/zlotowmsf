import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import decodeEntities from 'parse-entities';
import * as SC from './GalleryDetails.sc';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import ImagesGallery from '../../components/ImagesGallery/ImagesGallery';

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

  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchGalleryDetails(slug);
    return () => onClearGalleryDetails();
  }, [onFetchGalleryDetails, onClearGalleryDetails, slug]);

  let galleryDetailsNode = <Loader />;
  if (galleryDetails === undefined) {
    galleryDetailsNode = (
      <Heading variant="h3" align="center" data-test="not-found">
        Nie znaleziono takiej galerii
      </Heading>
    );
  } else if (galleryDetails) {
    const {
      acf: { description },
      title,
      images,
    } = galleryDetails;

    const gallerySection = images ? (
      <>
        <section className="gallery-section">
          <Heading variant="h5" margin="small" align="center">
            Kliknij na zdjęcie, żeby powiększyć
          </Heading>
        </section>
        <ImagesGallery images={images} />
      </>
    ) : null;

    const descriptionNode = description ? <div className="description">{description}</div> : null;

    galleryDetailsNode = (
      <SC.Wrapper>
        <Heading variant="h3" margin="medium" align="center">
          {decodeEntities(title.rendered)}
        </Heading>
        {descriptionNode}
        {gallerySection}
      </SC.Wrapper>
    );
  }

  if (isError) {
    galleryDetailsNode = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem danych o galerii
      </Heading>
    );
  }

  return <FreeSides>{galleryDetailsNode}</FreeSides>;
};

GalleryDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default GalleryDetails;
