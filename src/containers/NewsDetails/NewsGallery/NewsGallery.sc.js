import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level2};
  grid-gap: ${({ theme }) => theme.spacings.level2};
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));

  & .gallery-item {
    cursor: pointer;

    & img {
      display: block;
      height: 100%;
      max-height: 30rem;
    }
  }
`;
