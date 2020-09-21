import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './Button.sc';

const Button = (props) => {
  const { children } = props;
  return <SC.Button>{children}</SC.Button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
