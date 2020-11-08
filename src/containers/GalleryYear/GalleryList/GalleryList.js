import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import decodeEntities from 'parse-entities';
import * as SC from './GalleryList.sc';
import Loader from '../../../components/UI/Loader';
import Heading from '../../../components/UI/Heading/Heading';

const GalleryList = (props) => {
  const { isError } = useSelector((state) => state.ui);

  const { galleries, galleriesYear } = props;

  let galleryList = <Loader />;
  if (galleries) {
    if (galleries.length <= 0) {
      galleryList = (
        <Heading variant="h3" align="center" data-test="not-found">
          Nie znaleziono żadnych galerii
        </Heading>
      );
    } else {
      const allGalleries = galleries.map((gallery) => (
        <SC.SingleGallery key={gallery.id} to={`/galeria/id/${gallery.slug}`}>
          <div className="image-wrapper">
            <div className="image-overlay">
              <div className="image-overlay-content">Zobacz zdjęcia</div>
            </div>
            <img src={gallery.acf.thumbnail} alt={gallery.title.rendered} className="image" />
          </div>
          <span className="gallery-title">{decodeEntities(gallery.title.rendered)}</span>
        </SC.SingleGallery>
      ));

      galleryList = (
        <>
          <Heading variant="h4" align="center" margin="medium" data-test="year">
            {`Galerie zdjęć - rok ${galleriesYear}`}
          </Heading>
          <SC.GalleryList>{allGalleries}</SC.GalleryList>
        </>
      );
    }
  }

  if (isError) {
    galleryList = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem listy galerii
      </Heading>
    );
  }

  return galleryList;
};

GalleryList.defaultProps = {
  galleries: null,
};

GalleryList.propTypes = {
  galleries: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  galleriesYear: PropTypes.string.isRequired,
};

export default GalleryList;
