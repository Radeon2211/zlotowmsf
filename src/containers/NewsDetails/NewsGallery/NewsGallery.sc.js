import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level2};
  grid-gap: ${({ theme }) => theme.spacings.level2};
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));

  & .gallery-item {
    cursor: pointer;
    height: 25rem;

    & img {
      display: block;
      height: 100%;
    }
  }
`;
