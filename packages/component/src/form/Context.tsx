import React from 'react';

interface IThemeContext {
  color: {
    primary: string;
    danger: string;
    success: string;
  };
  padding: {
    md: string;
  };
}

export const theme: IThemeContext = {
  color: {
    primary: '#2b4ed3',
    danger: '#d32b2b',
    success: 'green',
  },
  padding: {
    md: '1rem',
  },
};

const Context = React.createContext<IThemeContext>(theme);

const { Provider, Consumer } = Context;

export { Provider, Consumer };

export default Context;
