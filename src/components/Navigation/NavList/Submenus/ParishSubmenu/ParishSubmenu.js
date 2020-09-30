import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { AnimatePresence} from 'framer-motion';
import { useWindowWidth } from '@react-hook/window-size';
import { NavLink } from 'react-router-dom';
import * as SC from '../Submenu.sc';
import { deviceTypes } from '../../../../../shared/constants';
import { submenuVariants } from '../../../../../shared/framer';

const ParishSubmenu = (props) => {
  const { isVisible, sidebarClosed, submenuClosed } = props;
  const windowWidth = useWindowWidth();

  const deviceType = windowWidth > 900 ? deviceTypes.DESKTOP : deviceTypes.MOBILE;

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
            <ul className="list">
              <li>
                <NavLink to="/parafia/historia" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Historia
                </NavLink>
              </li>
              <li>
                <NavLink to="/parafia/duszpasterze" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Duszpasterze
                </NavLink>
              </li>
              <li>
                <NavLink to="/parafia/porzadek-mszy-swietych" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Porządek Mszy Świętych
                </NavLink>
              </li>
              <li>
                <NavLink to="/parafia/kaplice-dojazdowe" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Kaplice dojazdowe
                </NavLink>
              </li>
              <li>
                <NavLink to="/parafia/wspolnoty-parafialne" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Wspólnoty Parafialne
                </NavLink>
              </li>
              <li>
                <NavLink to="/parafia/hospicjum" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Hospicjum
                </NavLink>
              </li>
              <li>
                <NavLink to="/parafia/szpital-miejski" className="link" activeClassName="active-link" onClick={sidebarClosed}>
                  Szpital Miejski
                </NavLink>
              </li>
            </ul>
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
