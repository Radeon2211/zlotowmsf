import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as SC from './Slides.sc';
import Slide from './Slide/Slide';

const Slides = () => {
  const [slideNumber, setSlideNumber] = useState(0);

  const { slides } = useSelector((state) => state.data.basic);

  const slideList = slides.map((slide, idx) => (
    <Slide key={slide.id} data={slide} isVisible={idx === slideNumber} />
  ));

  return <SC.Wrapper>{slideList}</SC.Wrapper>;
};

export default Slides;
