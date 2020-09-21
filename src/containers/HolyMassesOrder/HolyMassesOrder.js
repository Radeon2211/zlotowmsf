import React from 'react';
import styled from 'styled-components';
import Heading from '../../components/UI/Heading/Heading';
import FreeSides from '../../components/UI/FreeSides';
import Line from '../../components/UI/Line';

const SC = {};
SC.Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .heading {
    margin: ${({ theme }) => theme.spacings.level3} 0;
  }

  .content-image {
    width: 100%;
  }

  @media only screen and (max-width: 56.25em) {
    .heading {
      text-align: center;
    }
  }
`;

const HolyMassesOrder = () => {
  return (
    <FreeSides>
      <SC.Wrapper>
        <Heading variant="h2" className="heading">Porządek Mszy Świętych</Heading>
        <Line mgBottom="medium" />
      </SC.Wrapper>
    </FreeSides>
  );
};

export default HolyMassesOrder;
