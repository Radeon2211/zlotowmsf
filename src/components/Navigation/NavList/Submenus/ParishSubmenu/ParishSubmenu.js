import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { AnimatePresence} from 'framer-motion';
import { useWindowWidth } from '@react-hook/window-size';
import { NavLink } from 'react-router-dom';
import * as SC from '../Submenu.sc';
import { deviceTypes, parishMenuItems } from '../../../../../shared/constants';
import { submenuVariants } from '../../../../../shared/framer';

const ParishSubmenu = (props) => {
  const { isVisible, sidebarClosed, submenuClosed } = props;
  const windowWidth = useWindowWidth();

  const deviceType = windowWidth > 900 ? deviceTypes.DESKTOP : deviceTypes.MOBILE;

  const menuItems = parishMenuItems.map(({ slug, name }) => (
    <li key={slug}>
      <NavLink to={`/parafia/${slug}`} className="link" activeClassName="active-link" onClick={sidebarClosed}>
        {name}
      </NavLink>
    </li>
  ));

  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        if (isVisible && !e.target.closest('#parish-submenu-trigger')) {
          submenuClosed();
        }
      }}
    >
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <SC.Wrapper
            deviceType={deviceType}
            variants={submenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul className="list">{menuItems}</ul>
          </SC.Wrapper>
        )}
      </AnimatePresence>
    </OutsideClickHandler>
  );
};

ParishSubmenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  sidebarClosed: PropTypes.func.isRequired,
  submenuClosed: PropTypes.func.isRequired,
};

export default ParishSubmenu;
