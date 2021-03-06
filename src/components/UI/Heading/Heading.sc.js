/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  max-width: 100%;
  margin: 0;

  ${({ uppercase }) => {
    if (uppercase) {
      return `
        text-transform: uppercase;
      `;
    }
    return ``;
  }}

  ${({ align }) => {
    if (align === 'left') {
      return `
        text-align: left;
      `;
    }
    if (align === 'center') {
      return `
        text-align: center;
      `;
    }
    if (align === 'right') {
      return `
        text-align: right;
      `;
    }
    return ``;
  }}

  ${({ margin, theme }) => {
    if (margin === 'small') {
      return `
        margin-bottom: ${theme.spacings.level2};
      `;
    }
    if (margin === 'medium') {
      return `
        margin-bottom: ${theme.spacings.level3};
      `;
    }
    if (margin === 'big') {
      return `
        margin-bottom: ${theme.spacings.level4};
      `;
    }
    if (margin === 'large') {
      return `
        margin-bottom: ${theme.spacings.level5};
      `;
    }
    return ``;
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'h1':
        return `
          font-size: 3.5rem;
          font-weight: 500;
          font-family: ${theme.fonts.logo};
          letter-spacing: 2px;
          line-height: 1;
        `;
      case 'h2':
        return `
          font-size: 6rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 2px;
          line-height: 1.1;
          word-wrap: break-word;

          @media only screen and (max-width: 37.5em) {
            font-size: 4.6rem;
          }

          @media only screen and (max-width: 23.5em) {
            font-size: 3.9rem;
          }
        `;
      case 'h3':
        return `
          font-size: 2.6rem;
          font-family: ${theme.fonts.heading};
          letter-spacing: 1px;
          line-height: 1;
        `;
      case 'h4':
        return `
          font-family: ${theme.fonts.heading};
          font-size: ${theme.fontSizes.level5};
          letter-spacing: 1px;
          line-height: 1;
        `;
      case 'h5':
        return `
          font-family: ${theme.fonts.heading};
          font-size: ${theme.fontSizes.level4};
          line-height: 1;
        `;
      case 'h6':
        return `
          font-family: ${theme.fonts.heading};
          font-size: ${theme.fontSizes.level3};
          line-height: 1;
        `;
      default:
        return ``;
    }
  }}
`;

// eslint-disable-next-line react/prop-types
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
