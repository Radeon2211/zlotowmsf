import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import * as SC from './PrivacyPolicy.sc';
import { backdropVariants, modalVariants } from '../../../shared/framer';
import Heading from '../../UI/Heading/Heading';
import { ReactComponent as CloseIcon } from '../../../images/SVG/cross.svg';

const PrivacyPolicy = (props) => {
  const { isOpen, closed } = props;

  const { basic } = useSelector((state) => state.data);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <SC.Wrapper>
          <SC.Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closed}
          />
          <SC.Modal variants={modalVariants} initial="hidden" animate="visible" exit="hidden">
            <div
              className="close-icon-wrapper"
              onClick={closed}
              role="button"
              tabIndex={0}
              onKeyDown={closed}
            >
              <CloseIcon />
            </div>
            <Heading variant="h4" align="center" margin="medium" data-test="heading">
              Polityka prywatności
            </Heading>
            <div className="content">
              {basic?.extraInfo?.privacyPolicy ||
                'Wystąpił problem z pobieraniem polityki prywatności'}
            </div>
          </SC.Modal>
        </SC.Wrapper>
      )}
    </AnimatePresence>
  );
};

PrivacyPolicy.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default PrivacyPolicy;
