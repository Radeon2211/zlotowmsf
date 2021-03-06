import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
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
`;

export const Modal = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light1};
  color: #000;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacings.level3};
  position: relative;
  width: 50rem;
  z-index: ${({ theme }) => theme.zIndexes.level2};

  & .close-icon-wrapper {
    cursor: pointer;
    position: absolute;
    right: ${({ theme }) => theme.spacings.level2};
    top: ${({ theme }) => theme.spacings.level2};

    & > svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  & .content {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    text-align: justify;
  }
`;

export const Backdrop = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;
