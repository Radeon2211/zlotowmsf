import React from 'react';
import styled from 'styled-components';
import Loader from './Loader';

const SC = {};
SC.Overlay = styled.div`
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const LoadingOverlay = () => (
  <SC.Overlay>
    <Loader />
  </SC.Overlay>
);

export default LoadingOverlay;
