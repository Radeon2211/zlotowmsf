import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavList from './NavList/NavList';
import logo from '../../images/logo.png';

const SC = {};
SC.Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  height: 100vh;
  left: 0;
  padding: 0 0 ${({ theme }) => theme.spacings.level5} 0;
  position: fixed;
  text-align: center;
  top: 0;
  width: 19rem;
  z-index: ${({ theme }) => theme.zIndexes.level3};

  & .logo {
    display: inline-block;
    margin: ${({ theme }) => theme.spacings.level4} 0;
    padding: 0 ${({ theme }) => theme.spacings.level2};
    width: 100%;
  }
`;

const DesktopNavigation = () => (
  <SC.Wrapper>
    <Link to="/" className="logo">
      <img src={logo} alt="Parafia pw. Wniebowzięcia NMP w Złotowie" />
    </Link>
    <NavList />
  </SC.Wrapper>
);

export default DesktopNavigation;
