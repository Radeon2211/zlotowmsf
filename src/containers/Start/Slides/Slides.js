import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as SC from './Slides.sc';
import Slide from './Slide/Slide';
import DarkButton from '../../../components/UI/Buttons/DarkButton';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';

const SLIDE_CHANGE_TIME = 6000;

const Slides = () => {
  const slideInterval = useRef(null);
  const [slideNumber, setSlideNumber] = useState(0);

  const { slides } = useSelector((state) => state.data.basic);

  let resetInterval = () => {};

  const nextButtonClickHandle = () => {
    setSlideNumber((prevState) => {
      resetInterval();
      if (prevState + 1 > slides.length - 1) return 0;
      return prevState + 1;
    });
  };

  resetInterval = () => {
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
  for (let i = 0; i < slides.length; i += 1) {
    changeSlideListItems.push(
      <DarkButton
        key={i}
        size="big"
        shape="circle"
        active={slideNumber === i}
        clicked={() => listButtonClickHandle(i)}
        data-test="slide-number-button"
      >
        {i + 1}
      </DarkButton>,
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
        <DarkButton
          size="big"
          shape="square"
          childRotation={180}
          clicked={prevButtonClickHandle}
          data-test="prev-slide-button"
        >
          <ArrowIcon />
        </DarkButton>
        <DarkButton
          size="big"
          shape="square"
          clicked={nextButtonClickHandle}
          data-test="next-slide-button"
        >
          <ArrowIcon />
        </DarkButton>
      </div>
    </SC.Wrapper>
  );
};

export default Slides;
