import styled from 'styled-components';

export const Wrapper = styled.section`
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
    background-color: ${({ theme }) => theme.colors.darkTransparent1};
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    height: 5rem;
    justify-content: center;
    outline: none;
    transition: all ${({ theme }) => theme.durations.level2}s;
    width: 5rem;

    & > svg {
      fill: ${({ theme }) => theme.colors.light1};
      height: ${({ theme }) => theme.fontSizes.level5};
      width: ${({ theme }) => theme.fontSizes.level5};
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
    padding-right: calc(2.5 * ${({ theme }) => theme.spacings.level5});
    position: absolute;
    left: 15%;
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }

  .list-button {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkTransparent1};
    border: 2px solid transparent;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.light1};
    cursor: pointer;
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.level5};
    font-weight: 700;
    height: 5rem;
    justify-content: center;
    outline: none;
    transition: all ${({ theme }) => theme.durations.level2}s;
    width: 5rem;

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
    height: 80vh;

    .cs-list {
      left: 0;
      padding-left: ${({ theme }) => theme.spacings.level3};
    }
  }
`;
