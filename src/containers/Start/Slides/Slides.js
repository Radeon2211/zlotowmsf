import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as SC from './Slides.sc';
import Slide from './Slide/Slide';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';

const SLIDE_CHANGE_TIME = 6000;

const Slides = () => {
  const slideInterval = useRef(null);
  const [slideNumber, setSlideNumber] = useState(0);

  const { slides } = useSelector((state) => state.data.basic);

  const nextButtonClickHandle = () => {
    setSlideNumber((prevState) => {
      resetInterval();
      if (prevState + 1 > slides.length - 1) return 0;
      return prevState + 1;
    });
  };

  const resetInterval = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(nextButtonClickHandle, SLIDE_CHANGE_TIME);
  };

  const goToNextSlide = useCallback(() => {
    setSlideNumber((prevState) => {
      if (prevState + 1 > slides.length - 1) return 0;
      return prevState + 1;
    });
  }, [setSlideNumber, slides.length]);

  useEffect(() => {
    slideInterval.current = setInterval(goToNextSlide, SLIDE_CHANGE_TIME);
    return () => clearInterval(slideInterval.current);
  }, [goToNextSlide]);

  const prevButtonClickHandle = () => {
    setSlideNumber((prevState) => {
      resetInterval();
      if (prevState - 1 < 0) return slides.length - 1;
      return prevState - 1;
    });
  };

  const listButtonClickHandle = (idx) => {
    setSlideNumber((prevState) => {
      if (prevState === idx) return prevState;
      resetInterval();
      return idx;
    });
  };

  const changeSlideListItems = [];
  for (let i = 0; i < slides.length; i++) {
    changeSlideListItems.push(
      <button
        key={i}
        className={`list-button${slideNumber === i ? ' active' : ''}`}
        onClick={() => listButtonClickHandle(i)}
      >
        {i + 1}
      </button>
    );
  }

  const slideList = slides.map((slide, idx) => (
    <Slide key={slide.id} data={slide} isVisible={idx === slideNumber} />
  ));

  return (
    <SC.Wrapper>
      {slideList}
      <div className="cs-list">{changeSlideListItems}</div>
      <div className="cs-prev-next">
        <button className="pn-button p-button" onClick={prevButtonClickHandle}>
          <ArrowIcon />
        </button>
        <button className="pn-button n-button" onClick={nextButtonClickHandle}>
          <ArrowIcon />
        </button>
      </div>
    </SC.Wrapper>
  );
};

export default Slides;
