import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  display: flex;
  height: 6.5rem;
  justify-content: space-between;
  left: 0;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level3};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level3};

  .header {
    align-items: center;
    color: ${({ theme }) => theme.colors.light1};
    display: flex;
  }

  & .logo {
    margin-right: ${({ theme }) => theme.spacings.level2};
    width: 4.9rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
  }
`;

export const Toggler = styled.div`
  height: 5rem;
  width: 6rem;

  & .checkbox {
    display: none;
  }

  & .label {
    height: 100%;
    width: 100%;
    cursor: pointer;
    position: relative;
    text-align: center;
    display: block;
  }

  & .toggler-icon {
    position: relative;
    transition: all ${({ theme }) => theme.durations.level2}s;
    margin-top: calc(2.5rem - 1px);

    &,
    &::before,
    &::after {
      width: 4.2rem;
      display: inline-block;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.light1};
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      transition: all ${({ theme }) => theme.durations.level2}s;
    }

    &::before {
      transform: translateY(-1.3rem);
    }

    &::after {
      transform: translateY(1.3rem);
    }
  }

  & .label:hover .toggler-icon::before {
    transform: translateY(-1.5rem);
  }

  & .label:hover .toggler-icon::after {
    transform: translateY(1.5rem);
  }

  & .checkbox:checked + .label .toggler-icon {
    background-color: transparent;
  }

  & .checkbox:checked + .label .toggler-icon::before {
    transform: translateY(0) rotate(135deg);
  }

  & .checkbox:checked + .label .toggler-icon::after {
    transform: translateY(0) rotate(-135deg);
  }
`;
