import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.section`
  height: 100vh;
  position: relative;

  .cs-prev-next {
    bottom: ${({ theme }) => theme.spacings.level3};
    display: flex;
    position: absolute;
    right: ${({ theme }) => theme.spacings.level3};
    z-index: ${({ theme }) => theme.zIndexes.level2};

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level2};
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

    & > *:not(:last-child) {
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
