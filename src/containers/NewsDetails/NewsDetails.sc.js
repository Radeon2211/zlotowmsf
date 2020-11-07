import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .thumbnail {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .date {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.level5};
  }

  & .content {
    font-size: ${({ theme }) => theme.fontSizes.level4};
  }

  & .gallery-section {
    border-top: 2px solid ${({ theme }) => theme.colors.blue};
    margin-top: ${({ theme }) => theme.spacings.level3};
    padding-top: ${({ theme }) => theme.spacings.level3};
  }
`;
