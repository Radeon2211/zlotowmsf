import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const YearList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level3};
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));

  @media only screen and (max-width: 56.25em) {
    gap: ${({ theme }) => theme.spacings.level2};
    grid-gap: ${({ theme }) => theme.spacings.level2};
  }

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
`;

export const YearPanel = styled(Link)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  display: block;
  display: flex;
  height: 16rem;
  justify-content: center;

  & > * {
    color: ${({ theme }) => theme.colors.light1};
  }

  @media only screen and (max-width: 37.5em) {
    height: 13rem;
  }
`;
