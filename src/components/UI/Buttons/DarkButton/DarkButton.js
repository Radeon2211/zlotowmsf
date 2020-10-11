import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkTransparent1};
  border: 2px solid transparent;
  color: ${({ theme }) => theme.colors.light1};
  cursor: pointer;
  display: flex;
  font-weight: 700;
  justify-content: center;
  outline: none;
  padding: 0;
  transition: all ${({ theme }) => theme.durations.level2}s;

  & > svg {
    fill: ${({ theme }) => theme.colors.light1};
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.light1};
    }
  }


  ${({ shape }) => {
    switch (shape) {
      case 'circle':
        return `
          border-radius: 50%;
        `;
      case 'square':
      case 'rectangle':
        return `
          border-radius: 5px;
        `;
      default:
        return ``;
    }
  }}

  ${({ size, theme }) => {
    if (size === 'big') {
      return `
        font-size: ${theme.fontSizes.level5};
        height: 5.2rem;
        width: 5.2rem;

        & > svg {
          height: ${theme.fontSizes.level5};
          width: ${theme.fontSizes.level5};
        }
      `;
    } else {
      return `
        font-size: ${theme.fontSizes.level3};
        height: 3rem;
        width: 3rem;

        & > svg {
          height: ${theme.fontSizes.level3};
          width: ${theme.fontSizes.level3};
        }
      `;
    }
  }}

  ${({ active, theme }) => {
    if (active) {
      return `
        border-color: ${theme.colors.blue};
        color: ${theme.colors.blue};

        &:hover {
          border-color: ${theme.colors.blue};
        }

        & > svg {
          fill: ${theme.colors.blue};
        }
      `;
    }
  }}

  ${({ childRotation }) => {
    if (childRotation) {
      return `
        & > * {
          transform: rotate(${childRotation}deg);
        }
      `;
    }
  }}
`;

const DarkButton = (props) => {
  const { children, clicked } = props;
  return <SC.Wrapper onClick={clicked} {...props}>{children}</SC.Wrapper>;
};

DarkButton.defaultProps = {
  active: false,
  childRotation: undefined,
  clicked: () => {},
};

DarkButton.propTypes = {
  shape: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func,
  active: PropTypes.bool,
  childRotation: PropTypes.number,
};

export default DarkButton;
