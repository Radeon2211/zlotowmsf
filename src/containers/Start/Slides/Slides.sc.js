import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  position: relative;

  .cs-prev-next {
    bottom: ${({ theme }) => theme.spacings.level3};
    display: flex;
    position: absolute;
    right: ${({ theme }) => theme.spacings.level3};
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }

  .pn-button {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkTransparent};
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    height: 4rem;
    justify-content: center;
    outline: none;
    transition: all ${({ theme }) => theme.durations.level2}s;
    width: 4rem;

    & > svg {
      fill: ${({ theme }) => theme.colors.light1};
      height: 1.6rem;
      width: 1.6rem;
    }

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.light1};
    }

    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level2};
    }
  }

  .p-button {
    & > svg {
      transform: rotate(180deg);
    }
  }

  .cs-list {
    bottom: ${({ theme }) => theme.spacings.level3};
    display: flex;
    flex-wrap: wrap;
    max-width: 70%;
    position: absolute;
    left: 15%;
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }

  .list-button {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkTransparent};
    border: 2px solid transparent;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.light1};
    cursor: pointer;
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.level3};
    font-weight: 700;
    height: 4rem;
    justify-content: center;
    outline: none;
    transition: all ${({ theme }) => theme.durations.level2}s;
    width: 4rem;

    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.light1};
    }

    &.active {
      color: ${({ theme }) => theme.colors.blue};
      border: 2px solid ${({ theme }) => theme.colors.blue};
    }

    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level2};
    }
  }

  @media only screen and (max-width: 56.25em) {
    height: 70vh;

    .cs-list {
      left: 0;
      padding-left: ${({ theme }) => theme.spacings.level3};
    }

    .list-button {
      font-size: ${({ theme }) => theme.fontSizes.level4};
      height: 4rem;
      width: 4rem;
    }
  }
`;
