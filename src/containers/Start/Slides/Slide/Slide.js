import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { slideVariants, slideForegroundVariants, slideForegroundElementVariants } from '../../../../shared/framer';
import * as SC from './Slide.sc';
import Heading from '../../../../components/UI/Heading/Heading';
import MainButton from '../../../../components/UI/Buttons/MainButton/MainButton';
import { slidesExtraInfo } from '../../../../shared/constants';

const Slide = (props) => {
  const { data, isVisible } = props;
  const { title, acf: { firstLine, imageURL, secondLine, thirdLine, btnText, btnInnerLink, btnOuterLink, extraInfo } } = data;

  const { lastNewsSlug } = useSelector((state) => state.data.basic);

  const secondLineNode = secondLine ? (
    <motion.div variants={slideForegroundElementVariants} data-test="second-line">
      <Heading variant="h3" uppercase margin="medium">{secondLine}</Heading>
    </motion.div>
  ) : null;
  const thirdLineNode = thirdLine ? (
    <motion.span variants={slideForegroundElementVariants} className="third-line">{thirdLine}</motion.span>
  ) : null;

  let buttonWrapper = null;
  if (btnText) {
    const button = <MainButton>{btnText}</MainButton>;
    if (extraInfo === slidesExtraInfo.LATEST_NEWS) {
      buttonWrapper = (
        <motion.div variants={slideForegroundElementVariants} data-test="button-wrapper">
          <Link to={`/aktualnosci/${lastNewsSlug}`} data-test="router-link">{button}</Link>
        </motion.div>
      );
    } else if (btnInnerLink) {
      buttonWrapper = (
        <motion.div variants={slideForegroundElementVariants} data-test="button-wrapper">
          <Link to={btnInnerLink} data-test="router-link">{button}</Link>
        </motion.div>
      );
    } else {
      buttonWrapper = (
        <motion.div variants={slideForegroundElementVariants} data-test="button-wrapper">
          <a href={btnOuterLink} target="_blank" rel="noopener noreferrer" data-test="html-link">{button}</a>
        </motion.div>
      );
    }
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <SC.Wrapper
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <img src={imageURL} alt={title.rendered} className="bg-image" />
          <div className="overlay" />
          <motion.div
            className="foreground"
            variants={slideForegroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={slideForegroundElementVariants}>
              <Heading variant="h2" uppercase margin="medium">{firstLine}</Heading>
            </motion.div>
            {secondLineNode}
            {thirdLineNode}
            {buttonWrapper}
          </motion.div>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

Slide.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Slide;
