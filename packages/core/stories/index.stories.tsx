import { storiesOf } from '@storybook/react';
import React from 'react';
import ApolloMockingProvider from 'tests/mocks/ApolloMockingProvider';
import mocks from 'tests/mocks/mocks';

const ModelListWithData = () => {
  return null;
};

storiesOf('ModelList', module).add('renders a list', () => {
  const customResolvers = mocks({
    model: 5,
    field: 2,
  });

  const story = (
    <ApolloMockingProvider customResolvers={customResolvers}>
      <ModelListWithData />
    </ApolloMockingProvider>
  );

  return story;
});
