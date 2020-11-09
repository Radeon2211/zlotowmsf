import styled from 'styled-components';

export const Wrapper = styled.section`
  border-top: 2px solid ${({ theme }) => theme.colors.blue};
  margin-top: ${({ theme }) => theme.spacings.level3};
  padding-top: ${({ theme }) => theme.spacings.level3};
`;

export const Gallery = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level2};
  grid-gap: ${({ theme }) => theme.spacings.level2};
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
`;

export const GalleryItem = styled.div`
  cursor: pointer;
  height: 25rem;
  overflow: hidden;

  & > img {
    display: block;
    height: 100%;
    transition: transform ${({ theme }) => theme.durations.level3}s;

    &:hover {
      transform: scale(1.04);
    }
  }
`;
