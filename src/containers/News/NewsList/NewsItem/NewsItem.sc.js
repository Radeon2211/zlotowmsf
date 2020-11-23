import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkTransparent2};
  border-bottom: 3px solid ${({ theme }) => theme.colors.blue};
  height: min-content;
  padding: ${({ theme }) => theme.spacings.level2} ${({ theme }) => theme.spacings.level2}
    ${({ theme }) => theme.spacings.level3};

  & .thumbnail-link {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .title {
    color: ${({ theme }) => theme.colors.blue};
  }

  & .date {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.level5};
  }

  & .excerpt {
    font-size: ${({ theme }) => theme.fontSizes.level4};
    line-height: 1.33;
    margin: ${({ theme }) => theme.spacings.level3} 0;
    text-align: justify;

    & p {
      margin: 0;
    }
  }

  ${({ newest }) => {
    if (newest) {
      return `
        grid-column: 1 / 3;

        @media only screen and (max-width: 37.5em) {
          grid-column: 1;
        }
      `;
    }
    return ``;
  }}
`;
