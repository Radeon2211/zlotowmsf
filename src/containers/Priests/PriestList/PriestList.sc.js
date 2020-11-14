import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Priest = styled.div`
  margin: ${({ theme }) => theme.spacings.level2};
  background-color: ${({ theme }) => theme.colors.darkTransparent2};
  border-bottom: 3px solid ${({ theme }) => theme.colors.blue};
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacings.level3};
  ${({ theme }) => theme.spacings.level2};
  width: 28rem;

  & .image-wrapper {
    align-items: center;
    align-self: center;
    border-top: 1px solid ${({ theme }) => theme.colors.blue};
    border-left: 2px solid ${({ theme }) => theme.colors.blue};
    border-right: 2px solid ${({ theme }) => theme.colors.blue};
    border-bottom: 3px solid ${({ theme }) => theme.colors.blue};
    border-radius: 50%;
    display: flex;
    height: 20rem;
    justify-content: center;
    overflow: hidden;
    margin-bottom: ${({ theme }) => theme.spacings.level3};
    text-align: center;
    width: 20rem;
  }

  & .info-row {
    align-self: center;
    font-size: ${({ theme }) => theme.fontSizes.level3};

    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacings.level2};
    }
  }

  & .info-name {
    font-weight: 700;
  }

  @media only screen and (max-width: 37.5em) {
    width: 45rem;

    & .info-row {
      font-size: ${({ theme }) => theme.fontSizes.level4};
    }
  }
`;
