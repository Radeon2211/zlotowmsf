import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Heading.sc';

const Heading = (props) => {
  const { children } = props;
  return <SC.Heading {...props}>{children}</SC.Heading>;
};

Heading.defaultProps = {
  align: '',
  uppercase: false,
  margin: '',
};

Heading.propTypes = {
  align: PropTypes.string,
  uppercase: PropTypes.bool,
  margin: PropTypes.string,
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Heading;
