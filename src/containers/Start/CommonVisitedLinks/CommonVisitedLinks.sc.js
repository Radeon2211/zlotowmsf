import styled from 'styled-components';
import churchIndoor from '../../../images/church-indoor.jpg';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light2};
  display: flex;
  height: 20vh;
  padding: ${({ theme }) => theme.spacings.level2};
  position: relative;

  & .bg-image {
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url(${churchIndoor});
    background-position: center;
    background-size: cover;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  & .buttons-wrapper {
    align-items: center;
    display: grid;
    gap: ${({ theme }) => theme.spacings.level3};
    grid-gap: ${({ theme }) => theme.spacings.level3};
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndexes.level1};
  }

  & .link {
    & > button {
      align-items: center;
      display: flex;

      & > svg {
        height: 1.9rem;
        fill: ${({ theme }) => theme.colors.light1};
        margin-right: ${({ theme }) => theme.spacings.level1};
        width: 1.9rem;
      }

      @media (hover: hover) {
        &:hover {
          & > svg {
            fill: ${({ theme }) => theme.colors.blueLight};
          }
        }
      }
    }
  }

  @media only screen and (max-width: 75em) {
    & .buttons-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
