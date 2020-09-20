import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from './Sidebar.sc';
import NavList from '../../NavList/NavList';
import { backdropVariants, sidebarVariants } from '../../../../shared/framer';

const Sidebar = (props) => {
  const { isVisible, closed } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <>
          <SC.Backdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closed}
          />
          <SC.Sidebar
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <NavList sidebarClosed={closed} />
          </SC.Sidebar>
        </>
      )}
    </AnimatePresence>
  );
};

Sidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default Sidebar;
