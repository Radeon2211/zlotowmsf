import styled from 'styled-components';

export const Wrapper = styled.nav`
  & .list {
    list-style: none;
  }

  & .link {
    align-items: center;
    color: ${({ theme }) => theme.colors.light1};
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.level1};
    font-weight: 700;
    letter-spacing: 1px;
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level3};
    text-align: left;
    text-transform: uppercase;
    transition: ${({ theme }) => theme.durations.level1}s;
  }

  & svg {
    height: ${({ theme }) => theme.fontSizes.level4};
    fill: ${({ theme }) => theme.colors.light1};
    margin-right: ${({ theme }) => theme.spacings.level1};
    transition: color ${({ theme }) => theme.durations.level1}s;
    width: ${({ theme }) => theme.fontSizes.level4};
  }

  & .kostka-project-logo {
    height: auto;
    margin-right: ${({ theme }) => theme.spacings.level1};
    width: calc(2 * ${({ theme }) => theme.fontSizes.level4});
  }

  & .active-link {
    color: ${({ theme }) => theme.colors.blueLight};

    & > svg {
      fill: ${({ theme }) => theme.colors.blueLight};
    }
  }

  .submenu-trigger {
    cursor: pointer;
    position: relative;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  & .arrow {
    height: 1.2rem;
    margin-right: 0;
    margin-left: ${({ theme }) => theme.spacings.level1};
    transition: transform ${({ theme }) => theme.durations.level2}s;
    transform: rotate(90deg);
    width: 1.2rem;

    &.rotated {
      transform: rotate(-90deg);
    }
  }

  @media (hover: hover) {
    & .link:hover {
      color: ${({ theme }) => theme.colors.blueLight};

      & > svg {
        fill: ${({ theme }) => theme.colors.blueLight};
      }
    }
  }

  @media only screen and (max-width: 56.25em) {
    & .link {
      font-size: ${({ theme }) => theme.fontSizes.level3};
      padding: ${({ theme }) => theme.spacings.level2} ${({ theme }) => theme.spacings.level3};
    }

    & svg {
      height: 1.9rem;
      width: 1.9rem;
    }
  }
`;
