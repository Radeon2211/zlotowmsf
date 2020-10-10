import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  align-items: center;
  backdrop-filter: blur(3px);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: ${({ theme }) => theme.spacings.level2};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level4};

  & .close-icon {
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkTransparent1};
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    height: 5.4rem;
    justify-content: center;
    position: absolute;
    top: ${({ theme }) => theme.spacings.level3};
    transition: border-color ${({ theme }) => theme.durations.level2}s;
    right: ${({ theme }) => theme.spacings.level3};
    z-index: ${({ theme }) => theme.zIndexes.level3};
    width: 5.4rem;

    &:hover {
      border-color: ${({ theme }) => theme.colors.light1};
    }

    & > svg {
      height: ${({ theme }) => theme.fontSizes.level5};
      fill: ${({ theme }) => theme.colors.light1};
      width: ${({ theme }) => theme.fontSizes.level5};
    }
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
    position: absolute;
    top: 50%;
    transition: all ${({ theme }) => theme.durations.level2}s;
    transform: translateY(-50%);
    width: 5rem;
    z-index: ${({ theme }) => theme.zIndexes.level3};

    & > svg {
      fill: ${({ theme }) => theme.colors.light1};
      height: ${({ theme }) => theme.fontSizes.level5};
      width: ${({ theme }) => theme.fontSizes.level5};
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.light1};
    }
  }

  .p-button {
    left: ${({ theme }) => theme.spacings.level3};

    & > svg {
      transform: rotate(180deg);
    }
  }

  .n-button {
    right: ${({ theme }) => theme.spacings.level3};
  }
`;

export const Backdrop = styled(motion.div)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;

export const Slider = styled(motion.div)`
  height: 90%;
  max-width: 100%;
  position: relative;
  width: 120rem;
  z-index: ${({ theme }) => theme.zIndexes.level2};
`;
