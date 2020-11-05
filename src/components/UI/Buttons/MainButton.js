import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  border-radius: 1px;
  color: ${({ theme }) => theme.colors.light1};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.level3};
  font-weight: 700;
  letter-spacing: 2px;
  outline: none;
  padding: ${({ theme }) => theme.spacings.level2} ${({ theme }) => theme.spacings.level3};
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.durations.level1}s;

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.blueLight};
    }
  }
`;

const MainButton = (props) => {
  const { children } = props;
  return <SC.Wrapper>{children}</SC.Wrapper>;
};

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainButton;
