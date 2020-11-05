import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as SC from './NewsGallery.sc';
import ImageSlider from './ImageSlider/ImageSlider';
import ImageSlide from './ImageSlide/ImageSlide';

const NewsGallery = (props) => {
  const { images } = props;

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
    <div
      key={imageItem.id}
      className="gallery-item"
      tabIndex={0}
      role="button"
      onClick={() => clickImageHandle(idx)}
      onKeyDown={() => clickImageHandle(idx)}
    >
      <img src={imageItem.source_url} alt={imageItem.alt_text} />
    </div>
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

  return (
    <SC.Wrapper>
      {galleryItems}
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

NewsGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default NewsGallery;
