import { action } from '@storybook/addon-actions';
import { ApolloLink, InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { mount } from 'enzyme';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Context from 'src/form/Context';
import { Form } from 'src/form/Form/Form';

const theme = {
  color: {
    primary: '#2b4ed3',
    danger: '#d32b2b',
    success: 'green',
  },
  padding: {
    md: '1.5rem',
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([]),
});

export const FormProvider = ({ children }) => (
  <ApolloProvider client={client}>
    <Context.Provider value={theme}>
      <div className="container">{children}</div>
    </Context.Provider>
  </ApolloProvider>
);

export const FormDecorator = children => (
  <ApolloProvider client={client}>
    <Context.Provider value={theme}>
      <div className="container" style={{ padding: '1rem' }}>
        {children()}
      </div>
    </Context.Provider>
  </ApolloProvider>
);

export const ON_SUBMIT = input => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(input);
      resolve(action('createModel'));
    }, 1200);
  });
};

export const ON_COMPLETE = action('onComplete');

export const StorybookFormWrapper = ({ fields, ...props }) => (
  <Form
    {...props}
    fields={fields}
    onSubmit={props.onSubmit ? props.onSubmit : ON_SUBMIT}
    onComplete={ON_COMPLETE}
  />
);

export const mountForm = ({ fields, ...props }) =>
  mount(
    <FormProvider>
      <Form
        {...props}
        fields={fields}
        onSubmit={props.onSubmit ? props.onSubmit : ON_SUBMIT}
        onComplete={ON_COMPLETE}
      />
    </FormProvider>,
  );
