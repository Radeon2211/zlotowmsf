import React from 'react';
import NewsList from './NewsList/NewsList';
import FreeSides from '../../components/UI/FreeSides';
import styled from 'styled-components';
import Heading from '../../components/UI/Heading/Heading';
import Line from '../../components/UI/Line';

const SC = {};
SC.Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacings.level5} 0;
`;

const News = () => {
  return (
    <FreeSides>
      <SC.Wrapper>
        <Heading variant="h2" margin="small">Aktualności</Heading>
        <Line mgBottom="large" />
        <NewsList />
      </SC.Wrapper>
    </FreeSides>
  );
};

export default News;
