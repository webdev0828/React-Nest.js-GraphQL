---
to: src/containers/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>-container.js
---
import { omit } from 'lodash';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { createModel, updateModel, deleteModel } from 'amplify/_graphql/mutations';
import { getModel, listModels } from 'amplify/_graphql/queries';

export const refetchQueries = queries => Promise.all(queries.map(q => ApolloClient.query(
  Object.assign({}, q, {
    fetchPolicy: 'network-only',
  }),
)));

export const withModelItem = compose(
  graphql(gql(getModel), {
    props: props => ({
      <%= name.toLowerCase() %>: props.data.getModel || null,
      subscribeToModel: (params) => {
      },
    }),
  }),
);

export const withModelList = compose(
  graphql(gql(listModels), {
    name: 'list', // replaces 'data'
    options: {
      fetchPolicy: 'network-only',
    },
    props: props => ({
      <%= name.toLowerCase() %>s: props.list.listModels ? props.list.listModels.items : [],
      subscribeToNewModels: (params) => {
      },
    }),
  }),
);

export const withModelCreate = compose(
  graphql(gql(createModel), {
    name: 'create',
    options: {
      // fetchPolicy: 'network-only',
      refetchQueries: () => ['ListModels'],
    },
    props: props => ({
      createModel: (input) => {
        console.log('create!', input);
        return props.create({
          variables: {
            input,
          },
          awaitRefetchQueries: true,
        })
          .then(() => {
            console.log(props);
            props.ownProps.mutationSubscription.next(true);
          });
      },
    }),
  }),
);

export const withModelDelete = compose(
  graphql(gql(deleteModel), {
    name: 'delete', // replaces 'mutate'
    options: {
      refetchQueries: () => ['ListModels'],
    },
    props: props => ({
      deleteModel: (id, onDelete) => {
        console.log(props);
        console.log('deleteModel', id);
        return props.delete({
          variables: {
            input: {
              id,
            },
          },
          awaitRefetchQueries: true,
        }).then(() => {
          console.log('onDelete!');
          onDelete();
        });
      },
    }),
  }),
);

export const withModelUpdate = compose(
  graphql(gql(updateModel), {
    name: 'update',
    props: props => ({
      updateModel: input => props.update({
        variables: {
          input: omit(input, '__typename'),
        },
      }),
    }),
  }),
);

export const withModelDetail = compose(
  graphql(gql(getModel), {
    name: 'detail',
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        id: props.url.params.id,
      },
    }),
    props: props => ({
      <%= name.toLowerCase() %>: props.detail.getModel ? props.detail.getModel : null,
    }),
  }),
);
