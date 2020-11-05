import React from 'react';
import styled from 'styled-components';
import priestsImage from '../../images/priests-heading.jpg';
import FreeSides from '../../components/UI/FreeSides';

const SC = {};
SC.Wrapper = styled.div`
  & .heading-image {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }
`;

const Priests = () => {
  return (
    <FreeSides>
      <SC.Wrapper>
        <img src={priestsImage} alt="duszpasterze" className="heading-image" />
      </SC.Wrapper>
    </FreeSides>
  );
};

export default Priests;
