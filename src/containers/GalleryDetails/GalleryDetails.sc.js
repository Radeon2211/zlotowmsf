import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .description {
    font-size: ${({ theme }) => theme.fontSizes.level4};
    margin: ${({ theme }) => theme.spacings.level3} 0;
  }

  & .gallery-section {
    border-top: 2px solid ${({ theme }) => theme.colors.blue};
    margin-top: ${({ theme }) => theme.spacings.level3};
    padding-top: ${({ theme }) => theme.spacings.level3};
  }
`;
