import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level3};
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(2, 1fr);
  position: relative;

  & .first-news {
    grid-column: 1 / 3;
  }

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: 1fr;
  }
`;
