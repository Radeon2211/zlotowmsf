import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.light2};
  height: 4px;
  width: 60rem;

  ${({ mgBottom, theme }) => {
    if (mgBottom === 'small') {
      return `
        margin-bottom: ${theme.spacings.level2};
      `;
    }
    if (mgBottom === 'medium') {
      return `
        margin-bottom: ${theme.spacings.level3};
      `;
    }
    if (mgBottom === 'big') {
      return `
        margin-bottom: ${theme.spacings.level4};
      `;
    }
    if (mgBottom === 'large') {
      return `
        margin-bottom: ${theme.spacings.level5};
      `;
    }
    return ``;
  }}

  @media only screen and (max-width: 56.25em) {
    width: 100%;
  }
`;

const Line = (props) => {
  return <SC.Wrapper {...props} />;
};

Line.defaultProps = {
  mgBottom: '',
};

Line.propTypes = {
  mgBottom: PropTypes.string,
};

export default Line;
