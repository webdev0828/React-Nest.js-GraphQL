import { notification } from 'antd';
import { GraphQLError } from 'graphql';
import React, { Component } from 'react';
import {
  errorSubject,
  responseSubject,
  SuccessMessage,
} from 'src/config/apolloClient';

/**
 * This file loads data
 */
export const withErrors = ComposedComponent =>
  class extends Component {
    private subscription: any = {};

    async componentWillUnmount() {
      this.subscription.error!.unsubscribe();
      this.subscription.success!.unsubscribe();
    }
    componentDidMount() {
      this.subscription.success = responseSubject.subscribe({
        next: (data: SuccessMessage) => this.notifySuccess(data),
      });
    }
    private notifyWithError(error: GraphQLError) {
      const { message, extensions } = error;
      const { code } = extensions!;

      notification['error']({
        message: code,
        description: message,
      });
    }

    private notifySuccess(message: SuccessMessage) {
      notification['success'](message);
    }

    render() {
      this.subscription.error = errorSubject.subscribe({
        next: (error: GraphQLError) => this.notifyWithError(error),
      });

      return <ComposedComponent {...this.props} />;
    }
  };
