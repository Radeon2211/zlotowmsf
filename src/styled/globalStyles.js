import { createGlobalStyle } from 'styled-components';
import background from '../images/background.png'; // This pattern is downloaded from www.subtlepatterns.com

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, ul, ol, figure {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  @media only screen and (min-width: 112.5em) {
    html { font-size: 68.75%; }
  }

  @media only screen and (max-width: 56.25em) {
    html { font-size: 56.25%; }
  }

  @media only screen and (max-width: 37.5em) {
    html { font-size: 50%; }
  }

  body {
    background-color: ${({ theme }) => theme.colors.light2};
    background-image: url(${background});
    background-repeat: repeat;
    background-attachment: fixed;
    font-family: ${({ theme }) => theme.fonts.text};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a:active,
  a:focus,
  a:hover,
  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #000;
  }

  figure {
    max-width: 100%;
  }

  figcaption {
    text-align: center;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  .aligncenter {
    text-align: center;
  }
`;

export default GlobalStyles;
