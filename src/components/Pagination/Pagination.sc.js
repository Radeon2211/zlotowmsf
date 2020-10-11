import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacings.level5};

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level2};
  }

  @media only screen and (max-width: 37.5em) {
    justify-content: center;

    & > *:not(:last-child) {
      margin-right:  calc(0.5 * ${({ theme }) => theme.spacings.level2});
    }

    & > * {
      margin: calc(0.5 * ${({ theme }) => theme.spacings.level2});
    }
  }
`;
