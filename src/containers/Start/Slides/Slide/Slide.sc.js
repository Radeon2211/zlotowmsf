import styled from 'styled-components';
import { motion } from 'framer-motion';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled(motion.div)`
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  & .bg-image {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .overlay {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.15) 60%,
      rgba(0, 0, 0, 0)
    );
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: ${({ theme }) => theme.zIndexes.level1};
  }

  .foreground {
    color: ${({ theme }) => theme.colors.light1};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    left: 15%;
    position: absolute;
    top: 0;
    width: 60rem;
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }

  @media only screen and (max-width: 56.25em) {
    .overlay {
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.1) 90%,
        rgba(0, 0, 0, 0)
      );
    }

    .foreground {
      left: 0;
      max-width: 100%;
      padding: 0 ${({ theme }) => theme.spacings.level3};
    }
  }
`;
