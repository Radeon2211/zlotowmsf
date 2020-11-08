import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GalleryList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level3};
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(auto-fill, minmax(27rem, 1fr));
  position: relative;
`;

export const SingleGallery = styled(Link)`
  padding: ${({ theme }) => theme.spacings.level2};
  background-color: ${({ theme }) => theme.colors.darkTransparent2};
  height: min-content;

  & .image-wrapper {
    position: relative;
  }

  & .image {
    vertical-align: middle;
    height: 21rem;
  }

  & .image-overlay {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkTransparent1};
    display: flex;
    height: 100%;
    justify-content: center;
    opacity: 0;
    position: absolute;
    transition: opacity ${({ theme }) => theme.durations.level2}s;
    width: 100%;
  }

  &:hover .image-overlay {
    opacity: 1;
  }

  & .image-overlay-content {
    border: 2px solid ${({ theme }) => theme.colors.blueLight};
    color: ${({ theme }) => theme.colors.blueLight};
    font-size: ${({ theme }) => theme.fontSizes.level4};
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
    text-shadow: ${({ theme }) => theme.shadows.level3};
  }

  & .gallery-title {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.level3};
    font-weight: 700;
    margin-top: ${({ theme }) => theme.spacings.level2};
    text-align: center;
  }

  @media only screen and (max-width: 37.5em) {
    & .image {
      height: 24rem;
    }

    & .gallery-title {
      font-size: ${({ theme }) => theme.fontSizes.level4};
    }
  }
`;
