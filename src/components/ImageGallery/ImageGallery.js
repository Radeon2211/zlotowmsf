import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './ImageGallery.sc';
import ImageSlider from './ImageSlider/ImageSlider';
import ImageSlide from './ImageSlide/ImageSlide';
import Heading from '../UI/Heading/Heading';

const ImageGallery = (props) => {
  const { images, galleryHeading } = props;

  const [currentImage, setCurrentImage] = useState(0);
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  const prevClickHandle = () => {
    setCurrentImage((prevState) => {
      if (prevState - 1 < 0) return images.length - 1;
      return prevState - 1;
    });
  };

  const nextClickHandle = () => {
    setCurrentImage((prevState) => {
      if (prevState + 1 > images.length - 1) return 0;
      return prevState + 1;
    });
  };

  const clickImageHandle = (idx) => {
    setCurrentImage(idx);
    setIsSliderVisible(true);
  };

  const galleryItems = images.map((imageItem, idx) => (
    <SC.GalleryItem
      key={imageItem.id}
      className="gallery-item"
      tabIndex={0}
      role="button"
      onClick={() => clickImageHandle(idx)}
      onKeyDown={() => clickImageHandle(idx)}
    >
      <img src={imageItem.source_url} alt={imageItem.alt_text} />
    </SC.GalleryItem>
  ));

  const imageSlides = images.map((imageItem, idx) => (
    <ImageSlide
      key={imageItem.id}
      isVisible={currentImage === idx}
      closed={(e) => !e.target.closest('img') && setIsSliderVisible(false)}
    >
      <img src={imageItem.source_url} alt={imageItem.alt_text} />
    </ImageSlide>
  ));

  const galleryHeadingNode = galleryHeading ? (
    <Heading variant="h3" margin="medium">
      Galeria
    </Heading>
  ) : null;

  return (
    <SC.Wrapper>
      {galleryHeadingNode}
      <Heading variant="h5" margin="small" align="center">
        Kliknij na zdjęcie, żeby powiększyć
      </Heading>
      <SC.Gallery>{galleryItems}</SC.Gallery>
      <ImageSlider
        isVisible={isSliderVisible}
        closed={() => setIsSliderVisible(false)}
        goToPrev={prevClickHandle}
        goToNext={nextClickHandle}
      >
        {imageSlides}
      </ImageSlider>
    </SC.Wrapper>
  );
};

ImageGallery.defaultProps = {
  galleryHeading: false,
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  galleryHeading: PropTypes.bool,
};

export default ImageGallery;
