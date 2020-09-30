import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Sidebar = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.blue};
  height: calc(100vh - 6.5rem);
  padding-top: ${({ theme }) => theme.spacings.level3};
  position: fixed;
  top: 6.5rem;
  z-index: ${({ theme }) => theme.zIndexes.level2};
`;

export const Backdrop = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.2);
  height: calc(100vh - 6.5rem);
  left: 0;
  position: fixed;
  top: 6.5rem;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.level1};
`;
