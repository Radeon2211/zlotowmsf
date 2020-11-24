import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import DarkButton from './Buttons/DarkButton';
import { ReactComponent as ArrowIcon } from '../../images/SVG/arrow.svg';
import { scrollToTopVariants } from '../../shared/framer';

const SC = {};
SC.Wrapper = styled(motion.div)`
  bottom: ${({ theme }) => theme.spacings.level3};
  cursor: pointer;
  position: fixed;
  right: ${({ theme }) => theme.spacings.level3};
  z-index: ${({ theme }) => theme.zIndexes.level3};
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollHandle = useCallback(() => {
    setIsVisible(() => {
      return window.scrollY > 1000;
    });
  }, [setIsVisible]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
  }, [scrollHandle]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <SC.Wrapper variants={scrollToTopVariants} initial="hidden" animate="visible" exit="hidden">
          <DarkButton
            shape="square"
            size="big"
            childRotation={-90}
            color="blue"
            clicked={scrollToTop}
          >
            <ArrowIcon />
          </DarkButton>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
