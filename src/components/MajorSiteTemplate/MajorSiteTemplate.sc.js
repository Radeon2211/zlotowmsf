import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacings.level3} 0;
  font-size: ${({ theme }) => theme.fontSizes.level4};

  @media only screen and (max-width: 56.25em) {
    margin: ${({ theme }) => theme.spacings.level2} 0;
  }
`;
