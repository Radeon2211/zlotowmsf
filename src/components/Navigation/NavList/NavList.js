import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as SC from "./NavList.sc";
import ParishSubmenu from "./Submenus/ParishSubmenu/ParishSubmenu";
import SacramentsSubmenu from "./Submenus/SacramentsSubmenu/SacramentsSubmenu";
import { ReactComponent as StartIcon } from "../../../images/SVG/start.svg";
import { ReactComponent as NewsIcon } from "../../../images/SVG/news.svg";
import { ReactComponent as ParishIcon } from "../../../images/SVG/parish.svg";
import { ReactComponent as AnnoucementsIcon } from "../../../images/SVG/annoucements.svg";
import { ReactComponent as IntentionsIcon } from "../../../images/SVG/intentions.svg";
import { ReactComponent as SacramentsIcon } from "../../../images/SVG/sacraments.svg";
import { ReactComponent as OfficeIcon } from "../../../images/SVG/office.svg";
import { ReactComponent as MarriageCounselingIcon } from "../../../images/SVG/marriage-counseling.svg";
import { ReactComponent as FacebookIcon } from "../../../images/SVG/facebook.svg";
import { ReactComponent as GalleryIcon } from "../../../images/SVG/gallery.svg";
import { ReactComponent as LinksIcon } from "../../../images/SVG/links.svg";
import { ReactComponent as ContactIcon } from "../../../images/SVG/contact.svg";
import { ReactComponent as ArrowIcon } from "../../../images/SVG/arrow.svg";
import kostkaProjectLogo from "../../../images/kostka-project-logo.png";
import { validateURL } from "../../../shared/utility";

const NavList = (props) => {
  const { sidebarClosed } = props;

  const [isParishMenuVisible, setIsParishMenuVisible] = useState(false);
  const [isSacramentsMenuVisible, setIsSacramentsMenuVisible] = useState(false);

  const { basic } = useSelector((state) => state.data);

  const facebookLink = basic?.extraInfo?.parishFacebookLink;
  const kostkaProjectLink = basic?.extraInfo?.kostkaProjectLink;

  return (
    <SC.Wrapper>
      <ul className="list">
        <li>
          <NavLink
            exact
            to="/"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <StartIcon />
            Start
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aktualnosci"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <NewsIcon />
            Aktualności
          </NavLink>
        </li>
        <li>
          <div
            className="link submenu-trigger"
            id="parish-submenu-trigger"
            role="button"
            aria-hidden="true"
            onClick={() => setIsParishMenuVisible((prevState) => !prevState)}
          >
            <ParishIcon />
            Parafia
            <ArrowIcon
              className={`arrow${isParishMenuVisible ? " rotated" : ""}`}
            />
            <ParishSubmenu
              isVisible={isParishMenuVisible}
              sidebarClosed={sidebarClosed}
              submenuClosed={() => setIsParishMenuVisible(false)}
            />
          </div>
        </li>
        <li>
          <NavLink
            to="/ogloszenia"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <AnnoucementsIcon />
            Ogłoszenia
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/intencje"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <IntentionsIcon />
            Intencje
          </NavLink>
        </li>
        <li>
          <div
            className="link submenu-trigger"
            id="sacraments-submenu-trigger"
            role="button"
            aria-hidden="true"
            onClick={() =>
              setIsSacramentsMenuVisible((prevState) => !prevState)
            }
          >
            <SacramentsIcon />
            Sakramenty
            <ArrowIcon
              className={`arrow${isSacramentsMenuVisible ? " rotated" : ""}`}
            />
            <SacramentsSubmenu
              isVisible={isSacramentsMenuVisible}
              sidebarClosed={sidebarClosed}
              submenuClosed={() => setIsSacramentsMenuVisible(false)}
            />
          </div>
        </li>
        <li>
          <NavLink
            to="/kancelaria"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <OfficeIcon />
            Kancelaria
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/poradnia-malzenska"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <MarriageCounselingIcon />
            <div className="column">
              <span>Poradnia</span>
              <span>małżeńska</span>
            </div>
          </NavLink>
        </li>
        <li>
          <a
            href={validateURL(facebookLink) ? facebookLink : ""}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            onClick={sidebarClosed}
          >
            <FacebookIcon />
            Facebook
          </a>
        </li>
        <li>
          <NavLink
            to="/galeria"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <GalleryIcon />
            Galeria
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/linki"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <LinksIcon />
            Linki
          </NavLink>
        </li>
        <li>
          <a
            href={validateURL(kostkaProjectLink) ? kostkaProjectLink : ""}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            onClick={sidebarClosed}
          >
            <img
              src={kostkaProjectLogo}
              alt="Logo - Projekt Kostka"
              className="kostka-project-logo"
            />
            <div className="column">
              <span>Projekt</span>
              <span>Kostka</span>
            </div>
          </a>
        </li>
        <li>
          <NavLink
            to="/kontakt"
            className="link"
            activeClassName="active-link"
            onClick={sidebarClosed}
          >
            <ContactIcon />
            Kontakt
          </NavLink>
        </li>
      </ul>
    </SC.Wrapper>
  );
};

NavList.defaultProps = {
  sidebarClosed: () => {},
};

NavList.propTypes = {
  sidebarClosed: PropTypes.func,
};

export default NavList;
