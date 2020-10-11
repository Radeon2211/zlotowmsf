import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level5} ${({ theme }) => theme.spacings.level3};
  grid-gap: ${({ theme }) => theme.spacings.level5} ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(2, 1fr);
  position: relative;

  & .first-news {
    grid-column: 1 / 3;
  }

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: 1fr;
  }
`;

export const Overlay = styled.div`
  background-color: ${({ theme }) => theme.colors.light1Transparent};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;
