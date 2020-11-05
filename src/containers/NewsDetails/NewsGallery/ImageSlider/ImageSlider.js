import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from './ImageSlider.sc';
import DarkButton from '../../../../components/UI/Buttons/DarkButton';
import { imageSliderVariants, SCSliderVariants } from '../../../../shared/framer';
import { ReactComponent as ArrowIcon } from '../../../../images/SVG/arrow.svg';
import { ReactComponent as CrossIcon } from '../../../../images/SVG/cross.svg';

const ImageSlider = (props) => {
  const { isVisible, children, closed, goToPrev, goToNext } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <SC.Wrapper variants={imageSliderVariants} initial="hidden" animate="visible" exit="hidden">
          <SC.Backdrop onClick={closed} />
          <div className="close-icon">
            <DarkButton size="big" shape="circle" clicked={closed} data-test="close-button">
              <CrossIcon />
            </DarkButton>
          </div>
          <div className="pn-button p-button">
            <DarkButton
              size="big"
              shape="circle"
              clicked={goToPrev}
              childRotation={180}
              data-test="prev-button"
            >
              <ArrowIcon />
            </DarkButton>
          </div>
          <div className="pn-button n-button">
            <DarkButton size="big" shape="circle" clicked={goToNext} data-test="next-button">
              <ArrowIcon />
            </DarkButton>
          </div>
          <SC.Slider variants={SCSliderVariants} initial="hidden" animate="visible" exit="hidden">
            {children}
          </SC.Slider>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

ImageSlider.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closed: PropTypes.func.isRequired,
  goToPrev: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
};

export default ImageSlider;
