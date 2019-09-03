import '@codelab/component/dist/main.bundle.css';
import { ThemeProvider } from '@codelab/style';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'react-sortable-tree/style.css';
import 'src/hoc/_reset.css';

export const theme = {
  color: {
    primary: '#2b4ed3',
    danger: '#d32b2b',
    success: 'green',
  },
  padding: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
};

export const withStyle = ComposedComponent =>
  class WithStyle extends Component {
    static async getInitialProps(ctx) {
      return await ComposedComponent.getInitialProps(ctx);
    }

    render() {
      return (
        <ThemeProvider theme={theme}>
          <ComposedComponent {...this.props} />
          <style>
            {`
          #__next,
          .ant-layout {
            height: 100%;
          }

          .container {
            width: 100%;
            height: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }

          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }

          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }
        `}
          </style>
        </ThemeProvider>
      );
    }
  };
