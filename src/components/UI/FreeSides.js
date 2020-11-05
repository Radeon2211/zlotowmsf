import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  margin: ${({ theme }) => theme.spacings.level3} auto;
  max-width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level3};
  width: 100rem;

  @media only screen and (max-width: 56.25em) {
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacings.level4} ${({ theme }) => theme.spacings.level2};
  }
`;

const FreeSides = (props) => {
  const { children } = props;
  return <SC.Wrapper>{children}</SC.Wrapper>;
};

FreeSides.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FreeSides;
