import styled from 'styled-components';
import { motion } from 'framer-motion';
import { deviceTypes } from '../../../../shared/constants';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.blue};
  position: absolute;
  top: 0;

  ${({ deviceType, theme }) => {
    if (deviceType === deviceTypes.DESKTOP) {
      return `
        left: 100%;
        width: 100%;

        & .link {
          padding: ${theme.spacings.level1} ${theme.spacings.level2};
        }
      `;
    }
    return `
      left: 0;
      transform: translateX(-100%);
      width: calc(320px - 100%);

      & .link {
        padding: ${theme.spacings.level2};
      }

      @media only screen and (max-width: 56.25em) and (min-width: 37.5em) {
        width: 100%;
      }
    `;
  }}
`;
