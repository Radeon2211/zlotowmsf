import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  max-width: 100%;

  ${({ uppercase }) => {
    if (uppercase) {
      return `
        text-transform: uppercase;
      `;
    }
  }}

  ${({ margin, theme }) => {
    if (margin === 'small') {
      return `
        margin-bottom: ${theme.spacings.level2};
      `;
    } else if (margin === 'medium') {
      return `
        margin-bottom: ${theme.spacings.level3};
      `;
    } else if (margin === 'big') {
      return `
        margin-bottom: ${theme.spacings.level4};
      `;
    } else {
      return ``;
    }
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'h1':
        return `
          font-size: 3rem;
          font-family: ${theme.fonts.logo};
          letter-spacing: 2px;
          line-height: 1;
        `;
      case 'h2':
        return `
          font-size: 5.7rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 2px;
          line-height: 1.1;
          word-wrap: break-word;

          @media only screen and (max-width: 37.5em) {
            font-size: 4.5rem;
          }

          @media only screen and (max-width: 360px) {
            font-size: 3.8rem;
          }
        `;
      case 'h3':
        return `
          font-size: 2.4rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 1px;
          line-height: 1;
        `;
      case 'h4':
        return `
          font-size: ${theme.fontSizes.heading};
          font-size: 2.1rem;
          line-height: 1;
        `;
      default:
        return ``;
    }
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
