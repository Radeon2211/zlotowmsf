import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  align-items: center;
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
    position: absolute;
    top: ${({ theme }) => theme.spacings.level3};
    right: ${({ theme }) => theme.spacings.level3};
    z-index: ${({ theme }) => theme.zIndexes.level3};
  }

  .pn-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: ${({ theme }) => theme.zIndexes.level3};
  }

  .p-button {
    left: ${({ theme }) => theme.spacings.level3};
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
