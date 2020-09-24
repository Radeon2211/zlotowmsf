import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { slideVariants, slideForegroundVariants, slideForegroundElementVariants } from '../../../../shared/framer';
import * as SC from './Slide.sc';
import Heading from '../../../../components/UI/Heading/Heading';
import Button from '../../../../components/UI/Button/Button';

const Slide = (props) => {
  const { data, isVisible } = props;
  const { title, acf: { firstLine, imageURL, secondLine, thirdLine, btnText, btnInnerLink, btnOuterLink } } = data;

  const secondLineNode = secondLine ? (
    <motion.div variants={slideForegroundElementVariants}>
      <Heading variant="h3" uppercase margin="medium">{secondLine}</Heading>
    </motion.div>
  ) : null;
  const thirdLineNode = thirdLine ? (
    <motion.span variants={slideForegroundElementVariants} className="third-line">{thirdLine}</motion.span>
  ) : null;
  let buttonWrapper = null
  if (btnText) {
    const button = <Button>{btnText}</Button>;
    if (btnInnerLink) {
      buttonWrapper = (
        <motion.div variants={slideForegroundElementVariants}>
          <Link to={btnInnerLink}>{button}</Link>
        </motion.div>
      );
    } else {
      buttonWrapper = (
        <motion.div variants={slideForegroundElementVariants}>
          <a href={btnOuterLink} target="_blank" rel="noopener noreferrer">{button}</a>
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
