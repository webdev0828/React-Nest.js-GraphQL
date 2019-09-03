import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Consumer } from './Context';

const ThemeProvider = ({ children }) => (
  <Consumer>
    {theme => (
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    )}
  </Consumer>
);

export default ThemeProvider;
