import React from 'react';
import styled from 'styled-components';

const SC = {};
SC.Wrapper = styled.footer`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.light1};
  display: flex;
  justify-content: space-between;
  margin-left: 19rem;
  padding: ${({ theme }) => theme.spacings.level3};
  text-align: center;

  & .copyright {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .author {
    font-size: ${({ theme }) => theme.fontSizes.level1};
  }

  & .author-name {
    color: ${({ theme }) => theme.colors.light2};
    transition: color ${({ theme }) => theme.durations.level1}s;

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.light1};
      }
    }

  }

  @media only screen and (max-width: 75em) {
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacings.level3};
    }
  }

  @media only screen and (max-width: 56.25em) {
    margin-left: 0;
  }
`;

const Footer = () => {
  return (
    <SC.Wrapper>
      <span className="copyright">
        &copy;2020 Parafia Rzymskokatolicka w Złotowie pw. Wniebowzięcia Najświętszej Maryi Panny
      </span>
      <span className="author">
        Stworzone przez
        <a
          href="https://linkedin.com/in/rados%C5%82aw-mikrut-a8600b198/"
          rel="noopener noreferrer"
          target="_blank"
          className="author-name"
        >
          &nbsp;Radosław Mikrut
        </a>
      </span>
    </SC.Wrapper>
  );
};

export default Footer;
