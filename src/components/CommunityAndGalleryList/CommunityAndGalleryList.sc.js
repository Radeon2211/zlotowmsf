import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.level3};
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(auto-fill, minmax(27rem, 1fr));
  position: relative;
`;

export const Panel = styled(Link)`
  padding: ${({ theme }) => theme.spacings.level2};
  background-color: ${({ theme }) => theme.colors.darkTransparent2};
  height: min-content;

  & .image-wrapper {
    overflow: hidden;
    position: relative;
  }

  & .image {
    vertical-align: middle;
    height: 21rem;
  }

  & .image-overlay {
    background-color: ${({ theme }) => theme.colors.darkTransparent1};
    height: 100%;
    opacity: 0;
    left: 0;
    position: absolute;
    top: 0;
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
    left: 50%;
    opacity: 0;
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
    position: absolute;
    text-shadow: ${({ theme }) => theme.shadows.level3};
    top: 50%;
    transform: translate(-50%, 300%) scale(0.8);
    transition: all ${({ theme }) => theme.durations.level3}s;
    width: max-content;
  }

  &:hover .image-overlay-content {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  & .panel-title {
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

    & .panel-title {
      font-size: ${({ theme }) => theme.fontSizes.level4};
    }
  }
`;
