import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { AnimatePresence } from 'framer-motion';
import { useWindowWidth } from '@react-hook/window-size';
import { NavLink } from 'react-router-dom';
import * as SC from './Submenu.sc';
import { deviceTypes } from '../../../../shared/constants';
import { submenuVariants } from '../../../../shared/framer';

const SacramentsSubmenu = (props) => {
  const { isVisible, sidebarClosed, submenuClosed } = props;
  const windowWidth = useWindowWidth();

  const deviceType = windowWidth > 900 ? deviceTypes.DESKTOP : deviceTypes.MOBILE;

  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        if (isVisible && !e.target.closest('#sacraments-submenu-trigger')) {
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
            <ul className="list">
              <li>
                <NavLink to="/sakramenty/chrzest-swiety" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Chrzest Święty
                </NavLink>
              </li>
              <li>
                <NavLink to="/sakramenty/spowiedz-swieta" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Spowiedź Święta
                </NavLink>
              </li>
              <li>
                <NavLink to="/sakramenty/eucharystia" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Eucharystia
                </NavLink>
              </li>
              <li>
                <NavLink to="/sakramenty/1-komunia-swieta" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  I Komunia Święta
                </NavLink>
              </li>
              <li>
                <NavLink to="/sakramenty/bierzmowanie" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Bierzmowanie
                </NavLink>
              </li>
              <li>
                <NavLink to="/sakramenty/namaszczenie-chorych" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Namaszczenie chorych
                </NavLink>
              </li>
              <li>
                <NavLink to="/sakramenty/pogrzeb-katolicki" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Pogrzeb Katolicki
                </NavLink>
                <NavLink to="/sakramenty/sakramentalia" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Sakramentalia
                </NavLink>
              </li>
            </ul>
          </SC.Wrapper>
        )}
      </AnimatePresence>
    </OutsideClickHandler>
  );
};

SacramentsSubmenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  sidebarClosed: PropTypes.func.isRequired,
  submenuClosed: PropTypes.func.isRequired,
};

export default SacramentsSubmenu;
