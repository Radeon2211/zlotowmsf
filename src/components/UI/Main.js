import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.main`
  padding-left: 19rem;

  @media only screen and (max-width: 56.25em) {
    padding-left: 0;
    padding-top: 6.5rem;
  }
`;

const Main = (props) => {
  const { children } = props;
  return <SC.Wrapper>{children}</SC.Wrapper>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
