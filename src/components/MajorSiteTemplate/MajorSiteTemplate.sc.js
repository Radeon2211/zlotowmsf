import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.level4};
  padding: ${({ theme }) => theme.spacings.level3} 0;

  @media only screen and (max-width: 56.25em) {
    padding: ${({ theme }) => theme.spacings.level2} 0;
  }
`;
