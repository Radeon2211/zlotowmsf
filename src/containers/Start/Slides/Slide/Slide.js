import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { slideVariants, slideForegroundVariants, slideForegroundElementVariants } from '../../../../shared/framer';
import * as SC from './Slide.sc';
import { isDevMobile } from '../../../../shared/utility';
import { machineIP } from '../../../../shared/constants';
import Heading from '../../../../components/UI/Heading/Heading';

const Slide = (props) => {
  const { data, isVisible } = props;
  const { title, acf: { firstLine, imageURL, secondLine, thirdLine, btnInnerLink, btnOuterLink } } = data;

  const correctImageURL = isDevMobile() ? imageURL.replace('localhost', machineIP) : imageURL;
  const secondLineNode = secondLine ? (
    <motion.div variants={slideForegroundElementVariants}>
      <Heading variant="h3" uppercase margin="medium">{secondLine}</Heading>
    </motion.div>
  ) : null;
  const thirdLineNode = thirdLine ? (
    <motion.span variants={slideForegroundElementVariants} className="third-line">{thirdLine}</motion.span>
  ) : null;

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <SC.Wrapper
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <img src={correctImageURL} alt={title.rendered} className="bg-image" />
          <div className="overlay" />
          <motion.div
            className="foreground"
            variants={slideForegroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={slideForegroundElementVariants}>
              <Heading variant="h2" uppercase margin="small">{firstLine}</Heading>
            </motion.div>
            {secondLineNode}
            {thirdLineNode}
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
