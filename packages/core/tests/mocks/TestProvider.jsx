import React, { Component } from 'react';
import Faker from 'faker';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';
import { ApolloProvider } from 'react-apollo';
import PropTypes from 'prop-types';
import { createClient } from 'lib/apollo_client';
import schema from 'tests/mocks/schema';

export default class TestProvider extends Component {
  static propTypes = {
    graphqlMocks: PropTypes.object,
  };
  constructor(props) {
    super(props);
    // Every instance should have it's own schema instance so tests
    // don't bleed into one another
    this.schema = schema;
    this.apolloClient = createClient({
      link: new SchemaLink({ schema: this.schema }),
    });
    this.addDefaultMocks();
  }
  componentWillMount() {
    const { graphqlMocks } = this.props;
    this.mockGraphql(graphqlMocks);
  }
  componentWillReceiveProps({ graphqlMocks }) {
    this.mockGraphql(graphqlMocks);
  }
  addDefaultMocks() {
    addMockFunctionsToSchema({
      schema: this.schema,
      mocks: {
        ID: () => Faker.random.uuid(),
        String: () => Faker.lorem.sentence(),
      },
    });
  }
  mockGraphql(mocks = {}) {
    addMockFunctionsToSchema({
      schema: this.schema,
      mocks,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <ApolloProvider client={this.apolloClient}>{children}</ApolloProvider>
    );
  }
}
