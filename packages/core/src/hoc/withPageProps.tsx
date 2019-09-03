import React from 'react';
import withPage from 'src/hoc/_withPage';

interface IPageProps {
  hasSidebar: boolean;
}

const withPageProps = (
  myPageProps: IPageProps = { hasSidebar: false },
) => ComposedComponent => {
  const Composed = withPage(ComposedComponent);

  return class extends React.Component {
    static async getInitialProps(ctx) {
      /**
       * This actually loads, the other HOC doesn't
       */
      let pageProps = {};

      if (ComposedComponent.getInitialProps) {
        pageProps = await ComposedComponent.getInitialProps(ctx);
      }

      return { pageProps };
    }

    render() {
      const props = { ...this.props, ...myPageProps };
      return <Composed {...props} />;
    }
  };
};

export default withPageProps;
