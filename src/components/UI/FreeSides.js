import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  margin: 0 auto;
  max-width: 100%;
  padding: 0 ${({ theme }) => theme.spacings.level2};
  width: 100rem;
`;

const FreeSides = (props) => {
  const { children } = props;
  return <SC.Wrapper>{children}</SC.Wrapper>;
};

FreeSides.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FreeSides;
