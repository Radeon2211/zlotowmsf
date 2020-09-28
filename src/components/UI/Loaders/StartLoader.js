import React from 'react';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10rem 0;

  .sk-cube-grid {
    height: 5.7rem;
    width: 5.7rem;
  }

  & .sk-cube {
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    background-color: ${({ theme }) => theme.colors.blue};
    float: left;
    height: 33%;
    width: 33%;
  }

  & .sk-cube1,
  & .sk-cube5,
  & .sk-cube9 {
    animation-delay: 0.2s;
  }
  & .sk-cube2,
  & .sk-cube6 {
    animation-delay: 0.3s;
  }
  & .sk-cube4,
  & .sk-cube8 {
    animation-delay: 0.1s;
  }
  & .sk-cube3 { animation-delay: 0.4s; }
  & .sk-cube7 { animation-delay: 0; }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      transform: scale3D(1, 1, 1);
    } 35% {
      transform: scale3D(0, 0, 1);
    }
  }
`;

const StartLoader = () => {
  return (
    <SC.Wrapper>
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1" />
        <div className="sk-cube sk-cube2" />
        <div className="sk-cube sk-cube3" />
        <div className="sk-cube sk-cube4" />
        <div className="sk-cube sk-cube5" />
        <div className="sk-cube sk-cube6" />
        <div className="sk-cube sk-cube7" />
        <div className="sk-cube sk-cube8" />
        <div className="sk-cube sk-cube9" />
      </div>
    </SC.Wrapper>
  );
};

export default StartLoader;
