import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as SC from './MobileNavigation.sc';
import logo from '../../../images/logo.png';
import Heading from '../../UI/Heading/Heading';
import Sidebar from './Sidebar/Sidebar';

const MobileNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SC.Wrapper>
      <Link to="/">
        <header className="header">
          <img src={logo} alt="logo MSF Złotów" className="logo" />
          <Heading variant="h1">MSF Złotów</Heading>
        </header>
      </Link>
      <SC.Toggler>
        <input
          type="checkbox"
          id="nav-toggler"
          className="checkbox"
          checked={isSidebarOpen}
          onChange={() => setIsSidebarOpen((prevState) => !prevState)}
        />
        <label htmlFor="nav-toggler" className="label">
          <span className="toggler-icon" />
        </label>
      </SC.Toggler>
      <Sidebar isVisible={isSidebarOpen} closed={() => setIsSidebarOpen(false)} />
    </SC.Wrapper>
  );
};

export default MobileNavigation;
