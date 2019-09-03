import React, { Component, ReactNode } from 'react';

/**
 * This file loads data
 */

interface IP {
  client: any;
  children: (any?) => ReactNode;
}

class DataMiddleware extends React.Component<IP, any> {
  config; // Fetched from local state, used for configuring screen

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      delay: 0,
    };

    this.config = null;
  }

  componentDidMount() {
    // setTimeout(async () => {
    //   // await this.userService.refetchUser();
    //
    //   /**
    //    * Add Config
    //    */
    //   this.config = (await this.props.client.query({
    //     query: GET_CONFIG,
    //   })).data.config;
    //
    //   await this.setState({ loading: false });
    // }, this.state.delay);
  }

  render() {
    // return !this.state.loading ? (
    //   <>
    //     {/* <ServiceContext.Provider value={{ userService: this.userService
    // }}> */} {this.props.children({ config: this.config })} {/*
    // </ServiceContext.Provider> */} </> ) : ( <Loader /> );
    return this.props.children();
  }
}

export const withLoader = ComposedComponent =>
  class extends Component<any, {}> {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
