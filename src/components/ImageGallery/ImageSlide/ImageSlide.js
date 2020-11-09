import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { slideVariants } from '../../../shared/framer';

export const SC = {};
SC.Wrapper = styled(motion.div)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  & > img {
    height: auto;
    max-width: 100%;
    max-height: 100%;
    width: auto;
  }
`;

const ImageSlide = (props) => {
  const { children, isVisible, closed } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <SC.Wrapper
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closed}
        >
          {children}
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

ImageSlide.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default ImageSlide;
