import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacings.level5} 0;

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
