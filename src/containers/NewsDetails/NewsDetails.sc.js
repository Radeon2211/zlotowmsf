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
`;
