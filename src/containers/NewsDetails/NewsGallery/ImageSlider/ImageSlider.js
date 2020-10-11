import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import * as SC from './ImageSlider.sc';
import DarkButton from '../../../../components/UI/Buttons/DarkButton/DarkButton';
import { imageSliderVariants, backdropVariants } from '../../../../shared/framer';
import { ReactComponent as ArrowIcon } from '../../../../images/SVG/arrow.svg';
import { ReactComponent as CrossIcon } from '../../../../images/SVG/cross.svg';

const ImageSlider = (props) => {
  const { isVisible, closed, children, goToPrev, goToNext } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <SC.Wrapper>
          <SC.Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closed}
          />
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="close-icon"
          >
            <DarkButton size="big" shape="circle" clicked={closed}>
              <CrossIcon />
            </DarkButton>
          </motion.div>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="pn-button p-button"
          >
            <DarkButton size="big" shape="circle" clicked={goToPrev} childRotation={180}>
              <ArrowIcon />
            </DarkButton>
          </motion.div>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="pn-button n-button"
          >
            <DarkButton size="big" shape="circle" clicked={goToNext}>
              <ArrowIcon />
            </DarkButton>
          </motion.div>
          <SC.Slider variants={imageSliderVariants} initial="hidden" animate="visible" exit="hidden">
            {children}
          </SC.Slider>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

ImageSlider.propTypes = {
  closed: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  goToPrev: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
};

export default ImageSlider;
