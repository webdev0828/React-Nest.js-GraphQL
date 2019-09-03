import App, { Container } from 'next/app';
import React from 'react';
import routes from 'src/route/routes';

if ((process as any).browser) {
  // client-side-only code
  require('whatwg-fetch'); // required until cypress support fetch API
}

/**
 * Loaded automatically by Next.js
 */
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      /**
       * Attach next-routes 'name' property to props.url.route.name
       *
       * Next.js withRouter() HOC doesn't have name
       */
      pageProps.url = routes.match(ctx.asPath);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
