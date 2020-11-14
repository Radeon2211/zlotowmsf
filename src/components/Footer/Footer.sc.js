import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.footer`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.light1};
  display: flex;
  justify-content: space-between;
  margin-left: 19rem;
  padding: ${({ theme }) => theme.spacings.level3};
  text-align: center;

  & .copyright {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .author {
    font-size: ${({ theme }) => theme.fontSizes.level1};
  }

  & .darken-text {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.light2};
    font-size: ${({ theme }) => theme.fontSizes.level1};
    transition: color ${({ theme }) => theme.durations.level1}s;

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.light1};
      }
    }
  }

  @media only screen and (max-width: 75em) {
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacings.level3};
    }
  }

  @media only screen and (max-width: 56.25em) {
    margin-left: 0;
  }
`;
