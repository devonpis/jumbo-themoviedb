import React from 'react';
import { createGlobalStyle } from 'styled-components';
import theme, { appColor } from 'modules/theme';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }

  body {
    font-family: Roboto, sans-serif;
    font-size: 16px; /* stylelint-disable unit-blacklist */
    margin: 0;
    min-height: 100vh;
    padding: 0;
    background: ${theme.palette.bgColor};
    color: ${theme.palette.fontColor};
  }

  h1,
  h2,
  h3 {
    font-family: Montserrat, sans-serif;
    font-weight:bold;
  }

  h2 {
    font-size: 28px;
    line-height: 30px;
  }

  h3 {
    font-size: 20px;
    line-height: 24px;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  a {
    color: ${appColor};
    text-decoration: none;

    &.disabled {
      pointer-events: none;
    }
  }

  button {
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: inline-block;
    font-family: inherit;
    line-height: 1;
    padding: 0;
  }
`;

export default () => <GlobalStyle />;
