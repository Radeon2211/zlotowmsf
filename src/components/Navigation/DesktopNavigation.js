import React from 'react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import styled from 'styled-components';
import NavList from './NavList/NavList';
import logo from '../../images/logo.png';

const SC = {};
SC.Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.3);
  height: 100vh;
  left: 0;
  padding-top: ${({ theme }) => theme.spacings.level2};
  position: fixed;
  text-align: center;
  top: 0;
  width: 19rem;
  z-index: ${({ theme }) => theme.zIndexes.level3};

  & .logo {
    display: inline-block;
    margin-bottom: calc(${({ theme }) => theme.spacings.level2} / 2);
    padding: 0 ${({ theme }) => theme.spacings.level4};
    width: 100%;
  }
`;

const DesktopNavigation = () => {
  const windowWidth = useWindowWidth();

  return windowWidth > 900 ? (
    <SC.Wrapper>
      <Link to="/" className="logo">
        <img src={logo} alt="Parafia pw. Wniebowzięcia NMP w Złotowie" />
      </Link>
      <NavList />
    </SC.Wrapper>
  ) : null;
};

export default DesktopNavigation;
